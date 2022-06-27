import React, { useEffect, useState } from 'react';
import cx from 'clsx';

import styles from './Modal.module.css';
import { List } from '../model/issues';

// 강의에선 Modal 컴포넌트 안에 구현했던 로직을 hook으로 분리하였습니다.
// 이런식으로 분리 가능한 로직임을 보여드리고자 하였습니다. 참고만 해주세요 :)
// (재사용이 필요하다면 hooks.ts와 같은 곳으로 분리하는것도 좋겠죠?)
function useFilterData(searchDataList: List[]) {
  const [filteredData, setFilteredData] = useState(searchDataList);
  const [serachValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredData(searchDataList);
  }, [searchDataList]);

  useEffect(() => {
    if (serachValue === '') {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter(
        (item) => item.name.toLowerCase().includes(serachValue.toLowerCase()),
      );
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, serachValue]);

  return {
    serachValue,
    filteredData,
    setSearchValue,
  };
}

interface Props {
  opened: boolean;
  title: string;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  searchDataList: List[];
  onClickCell: (value: Record<string, string>) => void;
}

export default function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}: Props) {
  const {
    serachValue,
    filteredData,
    setSearchValue,
  } = useFilterData(searchDataList);

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>
          Filter by
          {' '}
          {title}
        </span>
        <button type="button" onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={serachValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filteredData.map((data, idx) => (
          <div
            role="button"
            onClick={() => {
              const isLabel = title.toLowerCase() === 'label';
              const paramKey = isLabel ? 'labels' : title.toLowerCase();

              onClickCell({ [paramKey]: data.name });
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`${data.name}-${idx}`}
            className={styles.item}
          >
            {data.name}
          </div>
        ))}
      </div>
    </div>
  );
}
