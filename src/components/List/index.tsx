import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import handleKeyUp from '../../utils/handleKeyUp';
import ResizeTextArea from '../ResizeTextArea';
import ListMenu from '../ListMenu';
import Item from '../Item';

import { ListType, ItemType } from '../../types';
import './styles.scss';

interface ListComponent {
  listState: ListType;
  setListState: (listState: ListType) => void;
  deleteList: (id: string) => void;
  isFocused: boolean;
}

const date = new Date();

const initialItemState = {
  id: null,
  title: 'New Task',
  description: '',
  createdAt: date,
  updatedAt: date,
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
    setListState({
      ...listState,
      items: [...listState.items, { ...item, id: uuidv4() }],
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
    if (listState.items.length > 1) {
      let sortedItems;
      if (dir === 'asc') {
        sortedItems = listState.items.sort((a, b) =>
          a[type] > b[type] ? 1 : -1
        );
      } else {
        sortedItems = listState.items.sort((a, b) =>
          a[type] > b[type] ? -1 : 1
        );
      }

      setListState({ ...listState, items: sortedItems });
    }
  };

  return (
    <div className="list-container">
      <span className="list-header">
        <input
          className="list-title"
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

      <div className="list-items">
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

      <div className="list-add-item">
        <ResizeTextArea
          id="title"
          className="edit-item-title"
          initialValue={item.title}
          onChange={handleChange}
        />
        <ResizeTextArea
          id="description"
          className="list-item-text-area"
          initialValue={item.description}
          onChange={handleChange}
          shouldFocus={isFocused}
          onSubmit={createItem}
        />
        <span className="list-add-item-footer">
          <button onClick={createItem}>
            <img
              className="icon"
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
