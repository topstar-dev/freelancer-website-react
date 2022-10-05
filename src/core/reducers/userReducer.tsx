import { IS_LOGIN } from "../actions/actionType";

const initialState = {
    success: false,
    user: {},
}

const userReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                success: true,
                user: action.payload,
            };
        default:
            return state;
    }
}

export default userReducers;