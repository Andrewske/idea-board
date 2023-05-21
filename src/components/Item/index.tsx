import { useState } from 'react';
import { format } from 'date-fns';
import { ItemType } from '../../types';

import ResizeTextArea from '../ResizeTextArea';
import styles from './styles.module.scss';

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
      className={styles.container}
      id={data.id}
    >
      <ResizeTextArea
        id="title"
        className={styles.title}
        initialValue={data.title}
        onChange={handleChange}
        colorShouldChange={true}
      />
      <ResizeTextArea
        id="description"
        className={styles.textarea}
        initialValue={data.description}
        onChange={handleChange}
        colorShouldChange={true}
      />
      {openTime && (
        <div className={styles.time}>
          <p>Created At: {format(data.createdAt, 'yyyy-MM-dd h:mm a')}</p>
          <p>Updated At: {format(data.updatedAt, 'yyyy-MM-dd h:mm a')}</p>
        </div>
      )}
      <span className={styles.footer}>
        <img
          className={styles.icon}
          src="/icons/icons8-clock-50.png"
          alt="time"
          onClick={() => setOpenTime(!openTime)}
        />

        <img
          className={styles.icon}
          src="/icons/icons8-delete-30.png"
          alt="delete"
          onClick={() => deleteItem(data.id)}
        />
      </span>
    </div>
  );
};

export default ListItem;
