export async function consumServices(body, endpoint, method) {
    try {
        const consum = await fetch(endpoint, {
            method: method,
            headers: { "Content-Type": "application/json" },
            ...(method !== "GET" ? { body: JSON.stringify(body) } : {})
        })
        const res = await consum.json()
        return res
    } catch (error) {
        return error
    }
}
