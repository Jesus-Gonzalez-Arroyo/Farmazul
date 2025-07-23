import { Alerts } from '../utils/alerts'
import {ENVIRONMENT, keysApi} from '../config'

export async function consumServices(endpoint, method = 'GET', headers = '', body = '') {
    try {
        const urlEndpoint = `${ENVIRONMENT.isProd ? keysApi.prod : keysApi.dev}${endpoint}`
        const defaultHeaders = { "Content-Type": "application/json" };
        const response = await fetch(urlEndpoint, {
            method,
            headers: headers === '' ? defaultHeaders : headers,
            ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {})
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : {};

        if (response.error) {
            const message = data.message || '¡Algo salió mal!';
            Alerts('Ups...', 'Ha ocurrido un error, vuelve a intentarlo', 'error');
            return { error: true, info: message, code: response.code };
        }

        return data;

    } catch (error) {
        console.error("Error de red o inesperado:", error);
        Alerts('Ups...', 'Ha ocurrido un error, vuelve a intentarlo', 'error');
        return { error: true, info: 'Error de red', code: 500 };
    }
}
