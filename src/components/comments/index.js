import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import CommentsText from '../comments-text';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const dispatch = useDispatch();
  const store=useStore();
  const { productId } = useParams(); // Получаем ID товара из URL
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
debugger
  const select = useSelector(state => ({
    comments: state.comments.data,
   // isAuthenticated: !!state.session.token,
    loading: state.comments.loading,
  }), shallowEqual
);

  useEffect(() => {
    if (productId) {
      dispatch(commentsActions.fetchComments(productId));
    }
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (newComment) {
      dispatch(commentsActions.addComment(newComment, productId));
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText) {
      dispatch(commentsActions.addReply(replyText, commentId));
      setReplyText('');
      setReplyTo(null);
    }
  };

  if (select.loading) return <p>Загрузка...</p>;

  return (
    <CommentsText
      comments={select.comments}
      isAuthenticated={select.isAuthenticated} // Проверьте, как Вы определяете авторизацию
      newComment={newComment}
      setNewComment={setNewComment}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      replyText={replyText}
      setReplyText={setReplyText}
      handleAddComment={handleAddComment}
      handleAddReply={handleAddReply}
    />
  );
}

export default memo(Comments);
