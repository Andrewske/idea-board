import { useState } from 'react';
import styles from './styles.module.scss';

interface ListMenuType {
  sortList: (type: 'title' | 'createdAt', dir: string) => void;
  deleteList: () => void;
}

const ListMenu = ({ sortList, deleteList }: ListMenuType) => {
  const [dateAsc, setDateAsc] = useState(false);

  const handleDateClick = () => {
    setDateAsc(!dateAsc);
    sortList('createdAt', dateAsc ? 'desc' : 'asc');
  };

  return (
    <span className={styles.container}>
      <img
        className={styles.icon}
        src="/icons/icons8-menu-50.png"
        alt="menu"
      />
      <span className={styles.content}>
        <span
          className={styles.item}
          onClick={handleDateClick}
        >
          {dateAsc ? (
            <img
              className={styles.icon}
              src="/icons/icons8-numeric-50.png"
              alt="menu"
            />
          ) : (
            <img
              className={styles.icon}
              src="/icons/icons8-reversed-numeric-50.png"
              alt="menu"
            />
          )}
        </span>
        <span
          className={styles.item}
          onClick={() => sortList('title', 'asc')}
        >
          <img
            className={styles.icon}
            src="/icons/icons8-alphabetical-sorting-50.png"
            alt="menu"
          />
        </span>
        <span
          className={styles.item}
          onClick={() => sortList('title', 'desc')}
        >
          <img
            className={styles.icon}
            src="/icons/icons8-alphabetical-sorting-2-50.png"
            alt="menu"
          />
        </span>
        <span
          className={styles.item}
          onClick={deleteList}
        >
          <img
            className={styles.icon}
            src="/icons/icons8-delete-30.png"
            alt="delete"
          />
        </span>
      </span>
    </span>
  );
};

export default ListMenu;
