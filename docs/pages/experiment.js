export function page() {
    return `
    <div id = "experiment-page">
        <div id = "experiment-page-header">
            <h2 id = "experiment-title-text"></h2>
            <input type = "text" id = "experiment-title-input"></input>

            <div id = "experiment-page-actions">
                <button id = "edit-experiment">Edit</button>
                <button id = "delete-experiment">Delete</button>
            </div>
            <div id = "experiment-page-edit-buttons" class = "hidden">
                <button id = "cancel-edit">Cancel</button>
                <button id = "save-edit">Save</button>
            </div>
        </div>

         <form id = "experiment-page-form">
            <div class = "experiment-part">
                <div class = "component">
                    <h3>Date</h3>
                    <p class = "experiment-date" id = "experiment-date-text"></p>
                    <input type = "text" id = "experiment-date-input">
                </div>
            </div>

            <div class = "experiment-part">
                <div class = "component">
                    <h3>Contributors</h3>
                    <div id = "experiment-contributors-list"></div>
                </div>
            </div>

            <div class = "experiment-part">
                <div class = "component">
                    <h3>Introduction</h3>
                    <p class = "textarea" id = "experiment-introduction-text"></p>
                    <textarea id = "experiment-introduction-input"></textarea>
                </div>

                <div class = "component">
                    <h3>Hypothesis</h3>
                    <p class = "textarea" id = "experiment-hypothesis-text" ></p>
                    <textarea id = "experiment-hypothesis-input"></textarea>
                </div>

                <div class = "component">
                    <h3>Materials</h3>
                    <div id = "experiment-materials-list"></div>
                </div>

                <div class = "component">
                    <h3>Method</h3>
                    <p class = "textarea" id = "experiment-method-text"></p>
                    <textarea id = "experiment-method-input"></textarea>
                </div>

                <div class = "component">
                    <h3>Results</h3>
                    <p class = "textarea" id = "experiment-results-text"></p>
                    <textarea id = "experiment-results-input"></textarea>
                </div>
                
                <div class = "component">
                    <h3>Discussion</h3>
                    <p class = "textarea" id = "experiment-discussion-text"></p>
                    <textarea id = "experiment-discussion-input"></textarea>
                </div>

                <div class = "component">
                    <h3>Conclusion</h3>
                    <p class = "textarea" id = "experiment-conclusion-text"></p>
                    <textarea id = "experiment-conclusion-input"></textarea>
                </div>
            </div>
        </form>

        <div id = "delete-container" class = "hidden">
            <h2 id = "delete-warning"></h2>
            <p>This action cannot be undone.

            <div id = "delete-buttons">
                <button id = "cancel-delete">Cancel</button>
                <button id = "confirm-delete">Delete</button>
            </div>
        </div>
    </div>
    `
} 


import {call_api, show_message, add_input} from "../extra-functions.js"


function make_list(type, data, list) {
    for (const element of data) {
        const container = document.createElement("div")
        container.classList.add(type)
        
        const text = document.createElement("p")
        text.classList.add("experiment-text")
        text.classList.add("text")
        text.textContent = element

        const placeholder = document.createElement("button")
        placeholder.classList.add("remove-placeholder")
        placeholder.disabled = true

        container.appendChild(text)
        container.appendChild(placeholder)
        list.appendChild(container)
    }
}

function list_to_inputs(list, type) {
    const text_elements = list.querySelectorAll(".experiment-text")
    const values = []

    for (const element of text_elements) {
        values.push(element.textContent)
    }
    list.innerHTML = ""

    for (const value of values) {
        add_input(list, type, `edit-${type}`, `remove-${type}`)

        list.lastElementChild.querySelector("input").value = value
    }
}

function hide_elements(type) {
    const title_element = document.getElementById(`experiment-title-${type}`)
    title_element.classList.add("hidden")
    
    const date_element = document.getElementById(`experiment-date-${type}`)
    date_element.classList.add("hidden")

    const introduction_element = document.getElementById(`experiment-introduction-${type}`)
    introduction_element.classList.add("hidden")

    const hypothesis_element = document.getElementById(`experiment-hypothesis-${type}`)
    hypothesis_element.classList.add("hidden")

    const method_element = document.getElementById(`experiment-method-${type}`)
    method_element.classList.add("hidden")

    const results_element = document.getElementById(`experiment-results-${type}`)
    results_element.classList.add("hidden")

    const discussion_element = document.getElementById(`experiment-discussion-${type}`)
    discussion_element.classList.add("hidden")

    const conclusion_element = document.getElementById(`experiment-conclusion-${type}`)
    conclusion_element.classList.add("hidden")
}

async function load_experiment(id) {
    const response = await call_api(null, `/experiments/${id}`, "GET")
    const experiment = response.data
    console.log(response.code)

    const title_text = document.getElementById("experiment-title-text")
    title_text.classList.remove("hidden")
    title_text.textContent = experiment.title
    
    const date_text = document.getElementById("experiment-date-text")
    date_text.classList.remove("hidden")
    date_text.textContent = experiment.date

    const introduction_text = document.getElementById("experiment-introduction-text")
    introduction_text.classList.remove("hidden")
    introduction_text.textContent = experiment.introduction

    const hypothesis_text = document.getElementById("experiment-hypothesis-text")
    hypothesis_text.classList.remove("hidden")
    hypothesis_text.textContent = experiment.hypothesis

    const method_text = document.getElementById("experiment-method-text")
    method_text.classList.remove("hidden")
    method_text.textContent = experiment.method

    const results_text = document.getElementById("experiment-results-text")
    results_text.classList.remove("hidden")
    results_text.textContent = experiment.results

    const discussion_text = document.getElementById("experiment-discussion-text")
    discussion_text.classList.remove("hidden")
    discussion_text.textContent = experiment.discussion

    const conclusion_text = document.getElementById("experiment-conclusion-text")
    conclusion_text.classList.remove("hidden")
    conclusion_text.textContent = experiment.conclusion

    const contributors_list = document.getElementById("experiment-contributors-list")
    make_list("contributor", experiment.contributors, contributors_list)

    const materials_list = document.getElementById("experiment-materials-list")
    make_list("material", experiment.materials, materials_list)

    
}

export async function setup(params) {
    hide_elements("input")
    await load_experiment(params.id)

    const edit_button = document.getElementById("edit-experiment")
    const edit_buttons = document.getElementById("experiment-page-edit-buttons")
    const regular_buttons = document.getElementById("experiment-page-actions")

    const contributors_list = document.getElementById("experiment-contributors-list")
    const materials_list = document.getElementById("experiment-materials-list")

    const save_edit = document.getElementById("save-edit")
    const cancel_edit = document.getElementById("cancel-edit")

    edit_button.addEventListener("click", function () {
        edit_buttons.classList.remove("hidden")
        regular_buttons.classList.add("hidden")
        list_to_inputs(contributors_list, "contributor")
        list_to_inputs(materials_list, "material")
    })

    cancel_edit.addEventListener("click", function () {
        hide_elements("input")
        load_experiment(params.id)
    })

    save_edit.addEventListener("click", function () {
    })

    const delete_button = document.getElementById("delete-experiment")
    const delete_container = document.getElementById("delete-container")
    const cancel_delete = document.getElementById("cancel-delete")
    const confirm_delete = document.getElementById("confirm-delete")
    const warning = document.getElementById("delete-warning")

    delete_button.addEventListener("click", function () {
        warning.textContent = `Are you sure you want to delete "${experiment.title}"?`
        delete_container.classList.remove("hidden")
    })

    cancel_delete.addEventListener("click", function () {
        delete_container.classList.add("hidden")
    })

    confirm_delete.addEventListener("click", async function () {
        const delete_response = await call_api(null, `/experiments/${params.id}`, "DELETE")
        if (delete_response.code === 200) {
            window.location.hash = "#/experiments"
            show_message("Experiment successfully deleted!")
        }
    })
}