import {Alert, type AlertModel} from "~/src/core/alert/domiain/entities/AlertModel";
import {AlertKind} from "~/src/core/alert/domiain/entities/AlertKind";


export interface AlertService {
    create(payload?: Partial<AlertModel>): Alert
}