export const SET_SELECTED_PLAYERS = "SET_SELECTED_PLAYERS"
export const SET_PLAYERS = "SET_PLAYERS"
export const SET_SELECTED_COURSE = "SET_SELECTED_COURSE"
export const SET_COURSES = "SET_COURSES"
export const SET_USER_COORDS = "SET_USER_COORDS"


//Player actions

export const setPlayers = (players) => (
    { type: SET_PLAYERS, payload: players, }
)

export const setSelectedPlayers = (players) => (
    ({ type: SET_SELECTED_PLAYERS, payload: players, })
)

export const setSelectedCourse = (course) =>
    ({ type: SET_SELECTED_COURSE, payload: course, })


export const setCourses = (courses) =>
    ({ type: SET_COURSES, payload: courses, })

export const setUserCoords = (coords) =>
    ({ type: SET_USER_COORDS, payload: coords })




