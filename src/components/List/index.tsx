import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import handleKeyUp from '../../utils/handleKeyUp';
import ResizeTextArea from '../ResizeTextArea';
import ListMenu from '../ListMenu';
import Item from '../Item';

import { ListType, ItemType } from '../../types';
import styles from './styles.module.scss';

interface ListComponent {
  listState: ListType;
  setListState: (listState: ListType) => void;
  deleteList: (id: string) => void;
  isFocused: boolean;
}

const initialItemState = {
  id: null,
  title: 'New Task',
  description: '',
  createdAt: null,
  updatedAt: null,
};

const List = ({
  listState,
  setListState,
  deleteList,
  isFocused,
}: ListComponent) => {
  const [item, setItem] = useState(initialItemState);
  const { id, title }: { id: string; title: string } = listState;

  // Can maybe use autofocus instead, so if autofocus = isFocused
  const titleRef = useRef<HTMLInputElement>(null);

  // Focus on the new item description for the first list on the page
  useEffect(() => {
    if (isFocused && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isFocused]);

  // Change the list title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListState({ ...listState, title: e.target.value });
  };

  // Make a change to the new item
  const handleChange = (key: string, value: string) => {
    setItem({ ...item, [key]: value });
  };

  // Submit new item to the list
  const createItem = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const date = new Date();

    setListState({
      ...listState,
      items: [
        ...listState.items,
        { ...item, id: uuidv4(), createdAt: date, updatedAt: date },
      ],
    });
    setItem(initialItemState);
  };

  // Function passed to the item for making changes after item creation
  const editItem = ({ id, title, description }: ItemType) => {
    const updatedItems = listState.items.map((item) => {
      if (item.id === id) {
        return { ...item, title, description, updatedAt: new Date() };
      }
      return item;
    });
    setListState({ ...listState, items: updatedItems });
  };

  const deleteItem = (id: string) => {
    setListState({
      ...listState,
      items: listState.items.filter((item) => item.id !== id),
    });
  };

  const sortList = (type: 'title' | 'createdAt', dir: string) => {
    if (listState.items.length <= 1) {
      return;
    }

    const sortedItems = listState.items.slice().sort((a, b) => {
      if (type === 'createdAt') {
        return dir === 'asc'
          ? new Date(a[type]).valueOf() - new Date(b[type]).valueOf()
          : new Date(b[type]).valueOf() - new Date(a[type]).valueOf();
      } else {
        return dir === 'asc'
          ? a[type].localeCompare(b[type])
          : b[type].localeCompare(a[type]);
      }
    });

    setListState({ ...listState, items: sortedItems });
  };

  return (
    <div className={styles.container}>
      <span className={styles.header}>
        <input
          className={styles.title}
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyUp={handleKeyUp()}
        />
        <ListMenu
          sortList={sortList}
          deleteList={() => deleteList(id)}
        />
      </span>

      <div className={styles.items}>
        {listState.items.length > 0 &&
          listState.items.map((item) => (
            <Item
              key={item.id}
              data={item}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ))}
      </div>

      <div className={styles['list-add-item']}>
        <ResizeTextArea
          id="title"
          className={styles.title}
          initialValue={item.title}
          shouldFocus={isFocused}
          onChange={handleChange}
        />
        <ResizeTextArea
          id="description"
          className={styles.textarea}
          initialValue={item.description}
          onChange={handleChange}
          onSubmit={createItem}
        />
        <span className={styles.footer}>
          <button onClick={createItem}>
            <img
              className={styles.icon}
              src="/icons/icons8-add-50-dark-blue.png"
              alt="add-icon"
            />
          </button>
          <p className="char-length">{item.description.length}</p>
        </span>
      </div>
    </div>
  );
};

export default List;
