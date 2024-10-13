
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function CommentsText(props) {
  const {
    comments,
    isAuthenticated,
    newComment,
    setNewComment,
    replyTo,
    setReplyTo,
    replyText,
    setReplyText,
    handleAddComment,
    handleAddReply
  } = props;

  return (
    <div>
      {isAuthenticated ? (
        <p>Войдите, чтобы иметь возможность комментировать</p>
      ) : (
        <>
          <h3>Комментарии</h3>
          {comments.map(comment => (
            <div key={comment._id}>
              <p>{comment.author.profile.name}: {comment.text}</p>
              <button onClick={() => setReplyTo(comment._id)}>Ответить</button>
              {replyTo === comment._id && (
                <div>
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Ваш ответ"
                  />
                  <button onClick={() => handleAddReply(comment._id)}>Отправить</button>
                </div>
              )}
              {comment.replies && comment.replies.map(reply => (
                <div key={reply._id} style={{ marginLeft: '20px' }}>
                  <p>{reply.author.profile.name}: {reply.text}</p>
                </div>
              ))}
            </div>
          ))}
          <div>
            <h3>Добавить комментарий</h3>
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ваш комментарий"
            />
            <button onClick={handleAddComment}>Отправить</button>
          </div>
        </>
      )}
    </div>
  );
}

CommentsText.propTypes = {
  comments: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  newComment: PropTypes.string.isRequired,
  setNewComment: PropTypes.func.isRequired,
  replyTo: PropTypes.string,
  setReplyTo: PropTypes.func.isRequired,
  replyText: PropTypes.string.isRequired,
  setReplyText: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  handleAddReply: PropTypes.func.isRequired,
};

export default memo(CommentsText);
