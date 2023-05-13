import { useState } from 'react';
import { format } from 'date-fns';
import { ItemType } from '../../types';

import ResizeTextArea from '../ResizeTextArea';
import './styles.scss';

interface ListItemType {
  data: ItemType;
  editItem: (data: ItemType) => void;
  deleteItem: (id: string) => void;
}

const ListItem = ({ data, editItem, deleteItem }: ListItemType) => {
  const [openTime, setOpenTime] = useState(false);

  const handleChange = (key: string, value: string) => {
    editItem({ ...data, [key]: value });
  };

  return (
    <div
      className="list-item"
      id={data.id}
    >
      <ResizeTextArea
        id="title"
        className="edit-item-title"
        initialValue={data.title}
        onChange={handleChange}
        colorShouldChange={true}
      />
      <ResizeTextArea
        id="description"
        className={'edit-item-text-area'}
        initialValue={data.description}
        onChange={handleChange}
        colorShouldChange={true}
      />
      {openTime && (
        <div className="list-item-time">
          <p>Created At: {format(data.createdAt, 'yyyy-MM-DD h:mm a')}</p>{' '}
          <p>Updated At: {format(data.createdAt, 'yyyy-MM-DD h:mm a')}</p>
        </div>
      )}
      <span className="list-item-footer">
        <img
          className="icon"
          src="/icons/icons8-clock-50.png"
          alt="time"
          onClick={() => setOpenTime(!openTime)}
        />

        <img
          className="icon"
          src="/icons/icons8-delete-30.png"
          alt="delete"
          onClick={() => deleteItem(data.id)}
        />
      </span>
    </div>
  );
};

export default ListItem;
