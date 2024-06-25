import type {Command} from "~/src/core/common/domain/Command";
import type {AlertService} from "~/src/core/alert/domain/application/service/AlertService";
import type {Alert} from "~/src/core/alert/domain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";

export class NewSuccessAlertUseCase implements Command {
    constructor(private readonly service: AlertService) {}
    execute(payload?: Omit<Alert, 'kind'>): Promise<Alert> {
        const {
            body = ['Success body'],
            title = 'Success title',
            icon = 'SuccessIcon'
        } = payload ?? {}

        return Promise.resolve(this.service.create({kind: AlertKind.SUCCESS, body, title, icon}));
    }

}