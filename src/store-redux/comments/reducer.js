
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'comments/fetch-start':
      return { ...state, loading: true, error: null };
    case 'comments/fetch-success':
      return { ...state, loading: false, data: action.payload };
    case 'comments/fetch-error':
      return { ...state, loading: false, error: action.error };
    case 'comments/add-success':
      return { ...state, data: [...state.data, action.payload] };
    case 'comments/reply-success':
      return {
        ...state,
        data: state.data.map(comment =>
          comment._id === action.payload.parent._id
            ? { ...comment, replies: [...(comment.replies || []), action.payload] }
            : comment
        ),
      };
    default:
      return state;
  }
};

export default reducer;
