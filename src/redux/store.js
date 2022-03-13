import { createStore, combineReducers, applyMiddleware } from "redux";
import { courseReducer, playerReducer, userReducer } from "./reducers";
import thunk from "redux-thunk";



const rootReducer = combineReducers({ playerReducer, courseReducer, userReducer })



export const Store = createStore(rootReducer, applyMiddleware(thunk))