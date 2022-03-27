import { createContext, useEffect, useReducer } from "react";
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'
import { createAction } from "../utils/reducer/reducer.utils";

//as  the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

//We create action types for the reducer function below 
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

//To change the original useState for a useReducer we need to create a reducer helper function:
const userReducer = (state, action) => {
    console.log('dispatched!')
    console.log(action)
    const { type, payload } = action
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error (`Unhandled type ${type} in userReducer`)
    }


}

// We define initial state for useReducer Hook
const INITIAL_STATE = {
    currentUser: null
}

//This provider is allowing any of it child components (We're wrappimg <App /> so every component has access)
export const UserProvider = ({children}) => {
    // const [ currentUser, setCurrentUser ] = useState(null) |||||| replaced useState Hook for useReducer Hook.
    
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE) //useReducer hook receives a reducer function and the initial state AND it return (destructured) a state object an a dispatch function!
    
    const {currentUser} = state //just destructured currentUser from state 
    console.log(currentUser)

    const setCurrentUser = ( user ) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)) //the setter function from useState won't work anymore so we have to declare it. Inside, we are dispatching the action with a payload to modify state.
    }

    const value = { currentUser, setCurrentUser }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if(user){
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        
        return unsubscribe

    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}