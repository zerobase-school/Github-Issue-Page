import { forwardRef } from 'react';
import cx from 'clsx';

import styles from './TextField.module.css';

function TextField(
  { type = 'input', name, placeholder, onChange, value, error },
  ref,
) {
  return type === 'input' ? (
    <input
      onChange={onChange}
      value={value}
      name={name}
      ref={ref}
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
      ref={ref}
      className={cx(styles.input, styles.textarea, styles.border, {
        [styles.erorr]: Boolean(error),
      })}
      placeholder={placeholder}
    />
  );
}

export default forwardRef(TextField);
