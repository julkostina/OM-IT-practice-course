import {compose, legacy_createStore as createStore , applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [process.env.NODE_ENV ==="development" &&logger, sagaMiddleware].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig  ={
    key:'root',
    storage,
    whitelist:['cart']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store  = createStore(persistedReducer, undefined, composedEnhancers);
  sagaMiddleware.run(rootSaga);
  export const persistor = persistStore(store);

