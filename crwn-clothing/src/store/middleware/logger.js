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