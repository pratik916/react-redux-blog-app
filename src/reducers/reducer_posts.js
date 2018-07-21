import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST_BY_ID, DELETE_POST } from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_POST_BY_ID:
            // [action.payload.data.id]: will create new key in object by post.id
            return { ...state, [action.payload.data.id]: action.payload.data };
            break;

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
            break;

        case DELETE_POST:
            return _.filter(...state, (item) => item.id !== action.payload);
            break;

        default:
            return state;
            break;
    }
}
