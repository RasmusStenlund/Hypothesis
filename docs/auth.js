export function save_token(token) {
    localStorage.setItem("token", token)
}

export function get_token() {
    return localStorage.getItem("token")
}

import {router} from "./script.js"

export function sign_out() {
    localStorage.removeItem("token")
    window.location.hash = "#/"
    router()
}

export function is_logged_in() {
    if (get_token()) {
        return true
    } else {
        return false
    }
}