import dayjs from 'dayjs';

import Badge from './Badge';
import ListItemLayout from './ListItemLayout';
import styles from './ListItem.module.css';

export default function ListItem({
  checked,
  onClickCheckBox,
  onClickTitle,
  data,
}) {
  const isOpenState = data.state === 'open';
  const badges = data.labels;
  const state = isOpenState ? 'opened' : 'closed';
  const date = isOpenState ? data.created_at : data.closed_at;

  return (
    <ListItemLayout checked={checked} onClick={onClickCheckBox}>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {badges &&
            badges.map((props) => <Badge {...props} key={props.name} />)}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()} by {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
