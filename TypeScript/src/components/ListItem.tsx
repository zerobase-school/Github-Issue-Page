import dayjs from 'dayjs';
import Badge from './Badge';
import { ListItem as ListItemProps } from '../model/issues';

import styles from './ListItem.module.css';
import ListItemLayout from './ListItemLayout';

interface Props {
  checked: boolean;
  onClickTitle?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  data: ListItemProps,
  onClickCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ListItem({
  checked,
  onClickCheckBox,
  onClickTitle,
  data,
}: Props) {
  const isOpenState = data.state === 'open';
  const badges = data.labels;
  const state = isOpenState ? 'opened' : 'closed';
  const date = isOpenState ? data.created_at : data.closed_at;

  return (
    <ListItemLayout checked={checked} onClick={onClickCheckBox}>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {badges
            && badges.map((props) => (
              <Badge
              // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                // eslint-disable-next-line react/prop-types
                key={props.name}
              />
            ))}
        </div>
        <div className={styles.description}>
          #
          {data.number}
          {' '}
          {state}
          {' '}
          {dayjs(date).fromNow()}
          {' '}
          by
          {' '}
          {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
