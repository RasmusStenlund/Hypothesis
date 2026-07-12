import * as home from "./pages/home.js"
import * as experiments from "./pages/experiments.js"
import * as new_experiment from "./pages/new.js"

 
const routes = {
    '#/': home,
    '#/experiments': experiments,
    '#/experiments/new': new_experiment
}

function router() {
    const current_hash = window.location.hash || '#/';

    const link_list = document.querySelectorAll(".links a")
    for (const link of link_list) {
        if (link.getAttribute("href") === current_hash) {
            link.classList.add("selected")
        } else {
            link.classList.remove("selected")
        }
    }

    const content_function = routes[current_hash]
    const app_container = document.getElementById('app')

    if (content_function) {
        app_container.innerHTML = content_function.page();

        if (content_function.setup) {
            content_function.setup();
        }
    } else {
        app_container.innerHTML = `
            <div class = "not-found">
                <h1>404</h1>
                <p>Page not found</p>
            </div>
        `
    }
}

window.addEventListener("hashchange", router)
window.addEventListener("load", router)