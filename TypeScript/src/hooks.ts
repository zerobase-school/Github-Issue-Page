import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { GITHUB_API } from './api';
import { ListItem as ListItemType } from './model/issues';

interface Props<T> {
  initialValues: T,
  validate: (value: T) => T | Record<string, never>,
  refs: Record<string,
  React.RefObject<HTMLInputElement | HTMLTextAreaElement> | null>,
  onSuccess: (result: string) => void,
  onErrors: () => void,
  onSubmit: () => Promise<string>
}

// extends에 대해 공부해보세요!
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  refs,
  onSuccess,
  onErrors,
  onSubmit,
}: Props<T>) {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErorrs] = useState<T | Record<string, never>>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e: React.ChangeEvent<{ name: string, value: string}>) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const validateResult = validate(inputValues);
    setErorrs(validateResult);

    const errorKeys = Object.keys(validateResult);

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      // eslint-disable-next-line no-alert
      alert(validateResult[key]);
      // onErrors();
      refs[key]?.current?.focus();
      setIsSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit();
        onSuccess(result);
      } catch {
        onErrors();
      }
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Authorization: process.env.REACT_APP_GITHUB_TOKEN!,
      'Content-Type': 'application/json',
    },
  });

  return data.data;
}

export function useUser() {
  return useQuery(['/user'], () => getUserInfo());
}

async function getIssueList(params: URLSearchParams) {
  const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
    params,
  });

  return data.data as ListItemType[];
}

export function useIssueList(params: URLSearchParams) {
  // 저의 경우엔 queryKey로 어떤 api를 호출했는지 명확히 알기 위해,
  // queryKey를 request path와 param을 조합하여 사용하고 있습니다.
  return useQuery(
    [`/repos/facebook/react/issues ${params.toString()}`],
    () => getIssueList(params),
  );
}
