import { getToken } from "./users-service"

export default async function sendRequest(url, method="GET", payload=null) {
    const options = { method }
    if (payload) {
        options.headers = { "Content-Type": "application/json" }
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if (token) {
        //Use the logical OR assignment operator
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    if (res.ok) return res.json()
    // console.log(res)
    throw new Error("Bad Request")
}