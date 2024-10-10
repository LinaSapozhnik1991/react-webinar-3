const initialState = {
  comments: [],
  currentComment: null,
  isAuthorized: false,
  loading: false,
};

export const selectComments = state => state.comments.comments;

export const selectIsAuthorized = state => state.comments.isAuthorized;

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_COMMENTS_SUCCESS':
      return { ...state, comments: action.payload.comments.result.items };

 case 'SET_AUTHORIZED':
      return { ...state, isAuthorized: action.payload };

    case 'ADD_COMMENT_SUCCESS':
      return { comments: [...state.comments, action.payload], currentComment: state.currentComment };

    case 'SET_CURRENT_COMMENT':
      return { ...state, currentComment: action.payload };

    default:
      return state;
  }
};

export default reducer;
