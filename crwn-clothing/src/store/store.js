// import {compose, legacy_createStore as createStore , applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// const loggerMiddleWare = (store)=>(next)=>(action)=>{
//     if(!action.type){
//         return next(action);
//     }
//     console.log('type', action.type);
//     console.log('payload', action.payload);
//     console.log('state', store.getState());
//     next(action);
//     console.log('state', store.getState());
// }
const middleWares = [logger];

// const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleWares),
});