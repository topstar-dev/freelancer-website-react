import { IS_MOBILE } from "../actions/actionType";

const initialState = {
    check: false
}

const mobileReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case IS_MOBILE:
            return {
                ...state,
                check: !state.check
            };
        default:
            return state;
    }
}

export default mobileReducers;