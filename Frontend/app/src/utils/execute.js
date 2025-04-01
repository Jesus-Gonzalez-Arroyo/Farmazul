export async function consumServices(endpoint, method, headers='', body='') {
    try {
        const consum = await fetch(endpoint, {
            method: method,
            ...(headers === '' ? {headers: { "Content-Type": "application/json" }} : {headers}),
            ...(method !== "GET" ? { body: JSON.stringify(body) } : {})
        })
        const res = await consum.json()
        return res
    } catch (error) {
        return error
    }
}
