import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import { selectComments, selectIsAuthorized } from '../../store-redux/comments/reducer';
import './style.css'
const CommentsSection = ({ productId,comments}) => {
  const dispatch = useDispatch();
 // const comments = useSelector(selectComments);
  const isAuthorized = useSelector(selectIsAuthorized);

  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const commentData = {
    text: commentText,
    parent: replyTo ? { _id: replyTo, _type: 'comment' } : { _id: productId, _type: 'article' }
  };

  useEffect(() => {
    dispatch(commentsActions.fetchComments(productId));
  }, [dispatch, productId]);

  const handleCommentSubmit = useCallback(() => {
    if (commentText.trim()) {
      dispatch(commentsActions.addComment(commentData));
      setCommentText('');
      setReplyTo(null);
    }
  }, [dispatch, commentData, commentText]);
  const renderComments = useCallback((comments) => {
    return comments.map(comment => (
      <div key={comment._id} className="comment">
        <p>
          {comment.author.profile.name} ({new Date(comment.dateCreate).toLocaleString()}): {comment.text}
        </p>
        <button onClick={() => setReplyTo(comment._id)}>Ответить</button>

        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies)}


        {replyTo === comment._id && (
          <div>
            <label>Новый ответ</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Отправить</button>
          </div>
        )}
      </div>
    ));
  }, [replyTo, commentText, handleCommentSubmit]);
  if (!isAuthorized) {
    return <p> <a href="/login">Войдите,</a> чтобы иметь возможность комментировать</p>;
  }

  return (
    <div className={'comments'}>
      <div>{renderComments(comments)}</div>
      <label>Новый комментарий</label>
      <textarea
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        placeholder="Текст..."
      />
      <button onClick={handleCommentSubmit}>Отправить</button>
    </div>
  );
};

export default CommentsSection;
