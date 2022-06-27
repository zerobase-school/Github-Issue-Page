import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { GITHUB_API } from './api';

export function useForm({
  initialValues,
  validate,
  refs,
  onSuccess,
  onErrors,
  onSubmit,
}) {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErorrs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    const validateResult = validate(inputValues);
    setErorrs(validateResult);

    const errorKeys = Object.keys(validateResult); // []

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(validateResult[key]);
      // onErrors();
      refs[key].current.focus();
      setIsSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit();
        onSuccess(result);
      } catch (e) {
        onErrors();
      }
      return;
    }
  }

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  };
}

async function getUserInfo() {
  const data = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  return data.data;
}

export function useUser() {
  return useQuery(['userInfo'], () => getUserInfo(), { cacheTime: 'Infinity' });
}

async function getIssueList(params) {
  const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
    params,
  });

  return data.data;
}

export function useIssueList(params) {
  // 저의 경우엔 queryKey로 어떤 api를 호출했는지 명확히 알기 위해,
  // queryKey를 request path와 param을 조합하여 사용하고 있습니다.
  return useQuery([`/repos/facebook/react/issues ${params.toString()}`], () =>
    getIssueList(params),
  );
}
