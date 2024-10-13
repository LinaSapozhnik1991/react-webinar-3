export default{
fetchComments : productId=> async (dispatch, getState, services) => {
  dispatch({ type: 'comments/fetch-start' });

  try {
    const response = await services.api.request({
      url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${productId}`,

    });

    dispatch({ type: 'comments/fetch-success', payload: response.data.result.items });
  } catch (error) {
    dispatch({ type: 'comments/fetch-error', error });
  }
},

addComment :(text, productId) => async (dispatch, getState, services) => {
  dispatch({ type: 'comments/add-start' });

  try {
    const response = await services.api.request({
      url: '/comments',
      method: 'POST',
      body: JSON.stringify({
        text,
        parent: { _id: productId, _type: 'article' },
      }),
    });

    dispatch({ type: 'comments/add-success', payload: response.data });
  } catch (error) {
    dispatch({ type: 'comments/add-error', error });
  }
},

addReply : (text, commentId) => async (dispatch, getState, services) => {
  dispatch({ type: 'comments/reply-start' });

  try {
    const response = await services.api.request({
      url: '/comments',
      method: 'POST',
      body: JSON.stringify({
        text,
        parent: { _id: commentId, _type: 'comment' },
      }),
    });

    dispatch({ type: 'comments/reply-success', payload: response.data });
  } catch (e) {
    dispatch({ type: 'comments/reply-error', error:e });
  }
}
}
