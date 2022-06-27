import cx from 'clsx';
import styles from './Pagination.module.css';

interface OnClickProps {
  onClick: (page: number) => void;
}

interface PageButtonProps extends OnClickProps{
  number: number;
  selected: boolean;
}

function PageButton({ number, onClick, selected }: PageButtonProps) {
  return (
    <button
      type="button"
      className={cx(styles.button, styles.pageButton, {
        [styles.selected]: selected,
      })}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}

interface Props extends OnClickProps{
  maxPage: number;
  currentPage: number;
}

export default function Pagination({
  maxPage,
  currentPage,
  onClick,
}: Props) {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={cx(styles.quickButton, styles.button, {
          [styles.disabled]: currentPage === 1,
        })}
      >
        {'< Previous'}
      </button>
      {new Array(maxPage).fill(null).map((_, i) => (
        <PageButton
          // eslint-disable-next-line react/no-array-index-key
          key={i + 1}
          number={i + 1}
          onClick={onClick}
          selected={i + 1 === currentPage}
        />
      ))}
      <button className={cx(styles.quickButton, styles.button)} type="button">
        {'Next >'}
      </button>
    </div>
  );
}
