export type AlertType = "warning" | "error" | "message" | "success";

export function MapAlertTypeToBootstrapType(type: AlertType): string {
    const map = {
        "warning": "alert-warning",
        "error": "alert-danger",
        "message": "alert-info",
        "success": "alert-success",
    };

    return map[type];
}