const redux = require('redux');
const thunkMiddleware  = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error:''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

const fetchUserRequest =  () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess =  () => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserFailure =  () => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}
const fetchUsers = () => {
    return function ( dispatch ) {
        dispatch(fetchUserRequest())
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users  = response.data.map(user => user.id);
            console.log(users);
            dispatch(fetchUserSuccess(users))
        })
        .catch(error => {
            dispatch(fetchUserFailure(error.message))
        })
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST: return{
            ...state,
            loading: true
        }
            
            break;
    
        case FETCH_USER_SUCCESS: return{
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
            
            break;
    
        case FETCH_USER_FAILURE: return{
            ...state,
            loading: false,
            users: [],
            error: action.payload
        } 
            break;
    
        default:
            break;
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));
console.log("ishlayapti");


store.subscribe(()=>{
    console.log(store.getState());
})
console.log(store.dispatch(fetchUsers()));;
store.dispatch(fetchUsers())