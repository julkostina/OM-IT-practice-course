import {compose, legacy_createStore as createStore , applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';


const middleWares = [process.env.NODE_ENV ==="development" &&logger, thunk].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig  ={
    key:'root',
    storage,
    blacklist:['user']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store  = createStore(persistedReducer, undefined, composedEnhancers);
  export const persistor = persistStore(store);

