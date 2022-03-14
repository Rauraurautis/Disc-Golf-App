import { SET_PLAYERS, SET_SELECTED_PLAYERS, SET_SELECTED_COURSE, SET_COURSES, SET_USER_COORDS, SET_LANGUAGE } from "./actions"

const initialState = {
    players: [],
    selectedPlayers: [],
    courses: [],
    selectedCourse: null,
    round: {},
    userCoords: {},
    language: "english"
}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYERS:
            return { ...state, players: action.payload }
        case SET_SELECTED_PLAYERS:
            return { ...state, selectedPlayers: action.payload }
        default:
            return state
    }
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_COURSE:
            return { ...state, selectedCourse: action.payload }
        case SET_COURSES:
            return { ...state, courses: action.payload }
        default:
            return state
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_COORDS:
            return { ...state, userCoords: action.payload }
        case SET_LANGUAGE:
            return { ...state, language: action.payload }
        default:
            return state
    }
}


