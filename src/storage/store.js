import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        store => next => action => {
            return next(action);
        }
    ),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;