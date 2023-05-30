import { v4 as uuidv4 } from 'uuid';
import { ListType } from '../../types';

import useScroll from '../../hooks/useScroll';

import Header from '../Header';
import List from '../List';
import styles from './styles.module.scss';

interface BoardTypes {
  listsState: ListType[];
  setListsState: (listsState: ListType[]) => void;
}

const Board = ({ listsState, setListsState }: BoardTypes) => {
  const { scrollLeft, scrollRight } = useScroll();

  // create a new list and save it in the global state
  const createList = () => {
    setListsState([
      ...listsState,
      { id: uuidv4(), title: 'new title', items: [] },
    ]);
  };

  // Delete the list by the given id
  const deleteList = (id: string) => {
    setListsState(listsState.filter((list) => list?.id !== id));
  };

  // loop through lists and replace old list with new list then update global state
  const updateList = (list: ListType) => {
    const updatedList = listsState.map((item) => {
      return item.id === list.id ? list : item;
    });

    setListsState(updatedList);
  };

  return (
    <div className={styles.wrapper}>
      <Header createList={createList} />
      <div
        className={styles.container}
        id="board"
      >
        <div className={`${styles['scroll-icon']} ${styles['left']}`}>
          <img
            className={styles.icon}
            src="/icons/icons8-back-arrow-50.png"
            alt="scroll-left"
            onClick={scrollLeft}
          />
        </div>
        {listsState.length > 0
          ? listsState.map((list) => (
              <List
                key={list.id}
                listState={list}
                setListState={updateList}
                deleteList={deleteList}
              />
            ))
          : null}
        <div className={`${styles['scroll-icon']} ${styles['right']}`}>
          <img
            className={styles.icon}
            src="/icons/icons8-circled-right-50.png"
            alt="scroll-right"
            onClick={scrollRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
