import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import Button from './components/Button';
import ListItem from './components/ListItem';
import ListItemLayout from './components/ListItemLayout';
import Pagination from './components/Pagination';
import OpenClosedFilters from './components/OpenClosedFilters';
import ListFilter from './components/ListFilter';
import { useIssueList } from './hooks';

import styles from './ListContainer.module.css';

const MAX_PAGE = 10;

export default function ListContainer() {
  const [inputValue, setInputValue] = useState('is:pr is:open ');
  const [checked, setChecked] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const state = searchParams.get('state');

  // 강의때 진행했던 getData로직을 react query로 개선한 부분입니다 :)
  const { data: list } = useIssueList(searchParams);

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link to="/new" className={styles.link}>
            <Button
              style={{
                fontSize: '14px',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              New Issue
            </Button>
          </Link>
        </div>
        <OpenClosedFilters
          isOpenMode={state !== 'closed'}
          onClickMode={(mode) => setSearchParams({ state: mode })}
        />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter onChangeFilter={(params) => setSearchParams(params)} />
          </ListItemLayout>
          {list &&
            list.map((item) => (
              <ListItem
                data={item}
                key={item.id}
                checked={checked}
                onClickCheckBox={() => setChecked((c) => !c)}
              />
            ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={page}
          onClick={(pageNumber) =>
            setSearchParams({ page: pageNumber.toString() })
          }
          maxPage={MAX_PAGE}
        />
      </div>
    </>
  );
}
