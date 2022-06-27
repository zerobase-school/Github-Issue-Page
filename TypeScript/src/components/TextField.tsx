import { forwardRef } from 'react';
import cx from 'clsx';

import styles from './TextField.module.css';

interface Props {
  type?: 'input' | 'textarea';
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<{
    name: string;
    value: string;
  }>) => void
  value: string;
  error?: string;
}

function TextField(
  {
    type = 'input',
    name,
    placeholder,
    onChange,
    value,
    error,
  }: Props,
  ref: React.LegacyRef<HTMLTextAreaElement | HTMLInputElement>,
) {
  return type === 'input' ? (
    <input
      onChange={onChange}
      value={value}
      name={name}
      ref={ref as React.LegacyRef<HTMLInputElement>}
      className={cx(styles.input, styles.border, {
        [styles.error]: Boolean(error),
      })}
      placeholder={placeholder}
    />
  ) : (
    <textarea
      onChange={onChange}
      value={value}
      name={name}
      ref={ref as React.LegacyRef<HTMLTextAreaElement>}
      className={cx(styles.input, styles.textarea, styles.border, {
        [styles.erorr]: Boolean(error),
      })}
      placeholder={placeholder}
    />
  );
}

export default forwardRef(TextField);
