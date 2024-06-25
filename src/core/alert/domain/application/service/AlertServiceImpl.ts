import type {AlertService} from "~/src/core/alert/domain/application/service/AlertService";
import {Alert, type AlertModel} from "~/src/core/alert/domain/entities/AlertModel";

export class AlertServiceImpl implements AlertService {
    create(payload: AlertModel) {
        return new Alert(payload)
    }
}