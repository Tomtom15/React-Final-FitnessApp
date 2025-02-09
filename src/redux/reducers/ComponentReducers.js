import * as Types from "../actions/Types";
import Logger from "../../utils/Logger";



const initialState = {
    test: "",
    userData:{},
    instructor:""
};

const componentReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.TEST:
            return Object.assign({}, state, { test: action.payload })
       case Types.USER_PROFILE:
                return Object.assign({}, state, { userData: action.payload })
        case Types.INSTRUCTOR:
                return Object.assign({}, state, { instructor: action.payload })
        default:
            return state;
    }
}

export default componentReducers;