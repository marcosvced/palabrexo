import type {AlertService} from "~/src/core/alert/domiain/application/service/AlertService";
import {Alert, type AlertModel} from "~/src/core/alert/domiain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domiain/entities/AlertKind";

export class AlertServiceImpl implements AlertService {
    create(payload: Partial<AlertModel>) {
        switch (payload.kind) {
            default:
                const {
                    kind = AlertKind.SUCCESS,
                    body = ['lorem'],
                    title = 'Success title',
                    icon = 'SuccessIcon'
                } = payload
                return new Alert({kind, body, title, icon});
        }
    }
}