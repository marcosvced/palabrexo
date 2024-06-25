import type {Command} from "~/src/core/common/domain/Command";
import type {AlertService} from "~/src/core/alert/domain/application/service/AlertService";
import type {Alert} from "~/src/core/alert/domain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";

export class NewErrorAlertUseCase implements Command {
    constructor(private readonly service: AlertService) {}
    execute(payload?: Omit<Alert, 'kind'>): Promise<Alert> {
        const {
            body = ['Error body'],
            title = 'Error title',
            icon = 'ErrorIcon'
        } = payload ?? {}

        return Promise.resolve(this.service.create({kind: AlertKind.ERROR, body, title, icon}));
    }

}