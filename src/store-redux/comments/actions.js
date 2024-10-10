export default {
  /**
   * Установка авторизации пользователя.
   * @param isAuthorized
   * @return {Object}
   */
  setAuthorized: (isAuthorized) => {
    return {
      type: 'SET_AUTHORIZED',
      payload: isAuthorized,

    };
  },

  /**
   * Загрузка комментариев для данного продукта
   * @param productId
   * @return {Function}
   */
  fetchComments: (productId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'FETCH_COMMENTS_REQUEST' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?
          fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${productId}`
        });
        console.log(res)
        if (res.data && res.data.result && Array.isArray(res.data.result.items)) {
          dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: { comments:res.data.result.items } });
        } else {
          throw new Error("Неверный формат ответа от API");
        }

      } catch (error) {
        dispatch({ type: 'FETCH_COMMENTS_ERROR', error });
      }
    };
},

  addComment: (comment) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'ADD_COMMENT_REQUEST' });

      const token = localStorage.getItem('token');

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token

          },
        });

        // Успешное добавление комментария
        dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: { data: res.data } });
      } catch (error) {
        // Ошибка добавления комментария
        dispatch({ type: 'ADD_COMMENT_ERROR', error });
      }
    };
  },


  setCurrentComment: commentId => ({
    type: 'SET_CURRENT_COMMENT',
    payload: commentId
  }),


}
