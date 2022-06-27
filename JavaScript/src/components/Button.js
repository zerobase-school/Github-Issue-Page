/* eslint-disable react/button-has-type */
import styles from './Button.module.css';

// style sheet를 직접 주입받는 prop 대신 className으로 확장하는 방법으로 변경해보시는 것도 추천드립니다!
export default function Button({ style, children, type = 'button', disabled }) {
  return (
    <button
      className={styles.button}
      style={style}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
