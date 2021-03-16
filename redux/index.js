const redux  = require('redux');
const {combineReducers, applyMiddleware} = require('redux');
const reduxLogger = require('redux-logger'); 


const createStore = redux.createStore
const logger = reduxLogger.createLogger();


let BUY_CAKE = "BUY_CAKE";
let BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First Redux action"
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: "First Redux action"
    }
}

const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    IceCreams: 20
}

const cakeReducer = (state= initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes-1  
        }
        break;
        default:
            return state;
    }
}

const iceCreamReducer = (state= initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            IceCreams: state.IceCreams +1 
        } 
        break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCreams: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe();
store.dispatch(buyIceCream())