export type AlertType = "warning" | "error" | "message";

export function MapAlertTypeToBootstrapType(type: AlertType): string {
    const map = {
        "warning": "alert-warning",
        "error": "alert-danger",
        "message": "alert-info",
    };

    return map[type];
}