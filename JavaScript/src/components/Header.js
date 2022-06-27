import Button from './Button';
import Space from './Space';
import Tabs from './Tabs';

import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.topSection}>
        <h2 className={styles.name}>
          sunghyunjo / <span className={styles.bold}>github-issue-ex</span>
        </h2>
        <div className={styles.buttonContainer}>
          <Button
            style={{
              fontSize: '14px',
              backgroundColor: 'transparent',
              color: 'black',
            }}
          >
            Watch
          </Button>
          <Space />
          <Button
            style={{
              fontSize: '14px',
              backgroundColor: 'transparent',
              color: 'black',
            }}
          >
            Fork <div className={styles.circle}>5</div>
          </Button>
          <Space />
          <Button
            style={{
              fontSize: '14px',
              backgroundColor: 'transparent',
              color: 'black',
            }}
          >
            Star
          </Button>
        </div>
      </div>
      <Tabs />
    </div>
  );
}
