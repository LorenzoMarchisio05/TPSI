import { AlertType } from "./AlertType"

export type Alert  = {
    message: string,
    type: AlertType,
    duration: number,
};