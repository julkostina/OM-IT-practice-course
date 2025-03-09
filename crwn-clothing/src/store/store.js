import {compose, legacy_createStore as createStore , applyMiddleware} from 'redux';
// import logger from 'redux-logger';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

const loggerMiddleWare = (store)=>(next)=>(action)=>{
    if(!action.type){
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('state', store.getState());
    next(action);
    console.log('state', store.getState());
}
const middleWares = [loggerMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig  ={
    key:'root',
    storage,
    blacklist:['user']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store  = createStore(persistedReducer, undefined, composedEnhancers);
  export const persistor = persistStore(store);

