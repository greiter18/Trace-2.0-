import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';

const _NULL_STATE = Object.freeze({
  id: null
});

const SessionReducer = (state = _NULL_STATE, action) => {
	Object.freeze(state)
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			return {id: action.user.id}
		case LOGOUT_CURRENT_USER:
      // console.log('!!!!!!!!!!!!!!!!!!')
			return _NULL_STATE
		default:
			return state;
	}

}

export default SessionReducer;