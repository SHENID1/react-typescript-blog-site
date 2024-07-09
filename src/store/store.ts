import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/UserSlice'
import categoriesReducer from './reducers/CategoriesSlice'

const rootReducer = combineReducers({
    authReducer,
    categoriesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
