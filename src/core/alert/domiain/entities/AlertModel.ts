import {Serialize} from "~/src/core/common/domain/entities/Serialize";
import {AlertKind} from "~/src/core/alert/domiain/entities/AlertKind";

export interface AlertModel {
    title: string
    body: string[]
    icon?: string
    kind: AlertKind
}

@Serialize()
export class Alert implements AlertModel {
    body: string[];
    icon?: string;
    kind: AlertKind
    title: string;

    constructor({
                    body,
                    icon,
                    kind,
                    title,
                }: AlertModel) {
        this.body = body
        this.icon = icon
        this.kind = kind
        this.title = title
    }
}