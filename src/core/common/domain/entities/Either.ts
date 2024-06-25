import {Serialize} from "~/src/core/common/domain/entities/Serialize";

type Left<L> = { kind: "left"; leftValue: L };
type Right<R> = { kind: "right"; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

@Serialize()
export class Either<L, R> {
    constructor(private readonly value: EitherValue<L, R>) {
    }

    isLeft(): boolean {
        return this.value.kind === "left";
    }

    isRight(): boolean {
        return this.value.kind === "right";
    }

    fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
        switch (this.value.kind) {
            case "left":
                return leftFn(this.value.leftValue);
            case "right":
                return rightFn(this.value.rightValue);
        }
    }

    get(errorMessage?: string): R {
        return this.getOrThrow(errorMessage);
    }

    getOrThrow(errorMessage?: string): R {
        const throwFn = () => {
            throw Error(
                errorMessage
                    ? errorMessage
                    : "An error has ocurred retrieving value: " + JSON.stringify(this.value)
            );
        };

        return this.fold(
            () => throwFn(),
            rightValue => rightValue
        );
    }

    getLeft(): L {
        const throwFn = () => {
            throw Error("The value is right: " + JSON.stringify(this.value));
        };

        return this.fold(
            leftValue => leftValue,
            () => throwFn()
        );
    }

    getOrElse(defaultValue: R): R {
        return this.fold(
            () => defaultValue,
            someValue => someValue
        );
    }
}

export const useEither = {
    left: <L, R>(value: L) => new Either<L, R>({kind: "left", leftValue: value}),
    right: <L, R>(value: R) => new Either<L, R>({kind: "right", rightValue: value})
}
