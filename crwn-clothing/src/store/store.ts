import {
  compose,
  createStore,
  applyMiddleware, Middleware
} from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

export type RootState = ReturnType<typeof rootReducer>;
const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware):middleware is Middleware=>Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
type ExtendedPersistConfig  =PersistConfig<RootState> &{
  whitelist: (keyof RootState)[];
};
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
