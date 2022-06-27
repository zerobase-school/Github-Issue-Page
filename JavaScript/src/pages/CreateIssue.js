/* eslint-disable no-console */
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'clsx';
import axios from 'axios';

import Button from '../components/Button';
import styles from './CreateIssue.module.css';
import TextField from '../components/TextField';

import { useForm } from '../hooks';
import { GITHUB_API } from '../api';

function validate(values) {
  let errors = {};

  if (values.title === '') {
    errors = { title: '타이틀은 필수값입니다.' };
  }

  return errors;
}

export default function CreateIssue() {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const { isSubmitting, inputValues, onChange, errors, handleSubmit } = useForm(
    {
      initialValues: { title: '', body: '' },
      onSubmit: async () => {
        const result = await axios.post(
          `${GITHUB_API}/repos/sunghyunjo/github-issue-ex/issues`,
          inputValues,
          {
            headers: {
              Authorization: process.env.REACT_APP_GITHUB_TOKEN,
              'Content-Type': 'applications/json',
            },
          },
        );
        return result;
      },
      validate,
      onErrors: () => console.log('error'),
      refs: { title: inputRef, body: textareaRef },
      onSuccess: (result) => {
        console.log({ result });
        navigate('/', { replace: true });
      },
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.avatar} />
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <TextField
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={inputValues.title}
            onChange={onChange}
            error={errors?.title}
          />
          <TextField
            type="textarea"
            ref={textareaRef}
            name="body"
            placeholder="Leave a comment"
            value={inputValues.body}
            onChange={onChange}
            error={errors?.body}
          />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              style={{
                fontSize: '14px',
                backgroundColor: 'green',
                color: 'white',
              }}
              disabled={isSubmitting}
            >
              Submit new issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
