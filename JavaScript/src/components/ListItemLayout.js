import cx from 'clsx';
import styles from './ListItemLayout.module.css';

export default function ListItemLayout({
  checked,
  onClick,
  children,
  className,
}) {
  return (
    <div className={cx(styles.wrapper, className)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onClick}
      />
      {children}
    </div>
  );
}
