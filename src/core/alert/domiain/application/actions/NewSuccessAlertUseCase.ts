import type {Command} from "~/src/core/common/domain/Command";
import type {AlertService} from "~/src/core/alert/domiain/application/service/AlertService";
import type {Alert} from "~/src/core/alert/domiain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domiain/entities/AlertKind";

export class NewSuccessAlertUseCase implements Command {
    constructor(private readonly service: AlertService) {}
    execute(args?: Alert): Promise<any> {
        return Promise.resolve(this.service.create({...args, kind: AlertKind.SUCCESS}));
    }

}