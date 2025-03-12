import { Middleware } from "redux";
import { RootState } from "../store";
import { AnyAction } from "redux";
export const loggerMiddleWare:Middleware<{},RootState> = (store)=>(next)=>(action: AnyAction)=>{
    if(!action.type){
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('state', store.getState());
    next(action);
    console.log('state', store.getState());
}