export function page() {
    return `
    <div id = "experiment-page">
        <h3 id = "experiment-title"></h3>
        <p id = "experiment-date"></p>
    </div>
    `
}

import {call_api, show_message} from "../extra-functions.js"

export async function setup(params) {
    const response = await call_api(null, `/experiments/${params.id}`, "GET")
    const experiment = response.data

    document.getElementById("experiment-title").textContent = experiment.title
    document.getElementById("experiment-date").textContent = experiment.date
}