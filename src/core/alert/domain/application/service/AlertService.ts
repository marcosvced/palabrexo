import {Alert, type AlertModel} from "~/src/core/alert/domain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";


export interface AlertService {
    create(payload?: Partial<AlertModel>): Alert
}