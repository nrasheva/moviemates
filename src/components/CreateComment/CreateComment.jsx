import { useState } from 'react';

import styles from './CreateComment.module.css';
import { createComment } from '../../services/comments.service';
import { handleError } from '../../tools';
import { Button } from '../Button/Button';

export const CreateComment = (props) => {
  const [content, setContent] = useState('');

  const handleCreateComment = async () => {
    try {
      const data = { content, movie: Number(props.movieId) };

      if (props.parent) {
        data.parent = props.parent;
      }

      await createComment(data);

      props.handleGetComments();

      setContent('');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form
      autoComplete='off'
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <textarea onChange={(e) => setContent(e.target.value)} placeholder='Enter comment' value={content} />
      <span className={styles['button-container']}>
        <Button icon='' onClick={handleCreateComment} text='Submit' type='filled' />
        <Button icon='' onClick={props.onCancel} text='Cancel' type='outlined' />
      </span>
    </form>
  );
};
