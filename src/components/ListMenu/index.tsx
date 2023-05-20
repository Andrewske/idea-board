import { useState } from 'react';
import './styles.scss';

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
    <span className="menu">
      <img
        className="icon menu-icon"
        src="/icons/icons8-menu-50.png"
        alt="menu"
      />
      <span className="menu-content">
        <span
          className="menu-item"
          onClick={handleDateClick}
        >
          {dateAsc ? (
            <img
              className="menu-item-icon"
              src="/icons/icons8-numeric-50.png"
              alt="menu"
            />
          ) : (
            <img
              className="menu-item-icon"
              src="/icons/icons8-reversed-numeric-50.png"
              alt="menu"
            />
          )}
        </span>
        <span
          className="menu-item"
          onClick={() => sortList('title', 'asc')}
        >
          <img
            className="menu-item-icon"
            src="/icons/icons8-alphabetical-sorting-50.png"
            alt="menu"
          />
        </span>
        <span
          className="menu-item"
          onClick={() => sortList('title', 'desc')}
        >
          <img
            className="menu-item-icon"
            src="/icons/icons8-alphabetical-sorting-2-50.png"
            alt="menu"
          />
        </span>
        <span
          className="menu-item"
          onClick={deleteList}
        >
          <img
            className="menu-item-icon"
            src="/icons/icons8-delete-30.png"
            alt="delete"
          />
        </span>
      </span>
    </span>
  );
};

export default ListMenu;
