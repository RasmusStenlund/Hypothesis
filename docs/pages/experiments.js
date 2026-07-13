export function page() {
    return `
    <div class = "experiments">
        <div id = "experiments-list"></div>
        <div id = "no-experiments">
            <p>No experiments yet</p>
            <p>Create your first experiment to get started</p>
            <button type = "button" id = "none-button">+ New Experiment</button>
        </div>
    </div>
    `
}

import {call_api, show_message} from "../extra-functions.js"

function make_experiment_card(title, date, contributors, hypothesis, id, parent) {
    const link = document.createElement("a")
    link.href = `#/experiments/${id}`

    const card = document.createElement("div")
    card.classList.add("experiment-card")

    const card_title = document.createElement("h3")
    card_title.classList.add("title")
    card_title.textContent = title
    card.appendChild(card_title)
    
    const info = document.createElement("div")
    info.classList.add("info")

    const card_date = document.createElement("p")
    card_date.classList.add("date")
    card_date.textContent = date
    info.appendChild(card_date)

    const card_contributors = document.createElement("p")
    card_contributors.classList.add("contributors")
    card_contributors.textContent = contributors.join(", ")
    info.appendChild(card_contributors)
    card.appendChild(info)

    const short_hypothesis = document.createElement("p")
    short_hypothesis.classList.add("hypothesis-preview")
    short_hypothesis.textContent = hypothesis
    card.appendChild(short_hypothesis)

    link.appendChild(card)
    parent.appendChild(link)
}

export async function setup() {
    const response = await call_api(null, "/experiments", "GET")
    const experiments_list = document.getElementById("experiments-list")

    for (const experiment of response.data) {
        make_experiment_card(experiment.title, experiment.date, experiment.contributors, experiment.hypothesis, experiment.id, experiments_list)
    }

    const no_experiments = document.getElementById("no-experiments")
    if (experiments_list.innerHTML.trim() === "") {
        no_experiments.classList.add("show")
    } else {
        no_experiments.classList.remove("show")
    }

    const none_button = document.getElementById("none-button")
    none_button.addEventListener("click", function () {
        window.location.hash = '#/experiments/new'
    })
}