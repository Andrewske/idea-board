import { v4 as uuidv4 } from 'uuid';
import { ListType } from '../../types';

import useScroll from '../../hooks/useScroll';

import Header from '../Header';
import List from '../List';
import styles from './styles.module.scss';

interface BoardTypes {
  globalState: ListType[];
  setGlobalState: (globalState: ListType[]) => void;
}

const Board = ({ globalState, setGlobalState }: BoardTypes) => {
  const { scrollLeft, scrollRight } = useScroll();

  // create a new list and save it in the global state
  const createList = () => {
    setGlobalState([
      ...globalState,
      { id: uuidv4(), title: 'new title', items: [] },
    ]);
  };

  // Delete the list by the given id
  const deleteList = (id: string) => {
    setGlobalState(globalState.filter((list) => list?.id !== id));
  };

  // loop through lists and replace old list with new list then update global state
  const updateList = (list: ListType) => {
    const updatedList = globalState.map((item) => {
      return item.id === list.id ? list : item;
    });

    setGlobalState(updatedList);
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
        {globalState.length > 0
          ? globalState.map((list, index) => (
              <List
                key={list.id}
                listState={list}
                setListState={updateList}
                deleteList={deleteList}
                isFocused={index === 0}
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
