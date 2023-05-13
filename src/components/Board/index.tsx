import { v4 as uuidv4 } from 'uuid';
import { ListType } from '../../types';

import Header from '../Header';
import List from '../List';
import './styles.scss';

interface BoardTypes {
  globalState: ListType[];
  setGlobalState: (globalState: ListType[]) => void;
}

const Board = ({ globalState, setGlobalState }: BoardTypes) => {
  const createList = () => {
    setGlobalState([
      ...globalState,
      { id: uuidv4(), title: 'new title', items: [] },
    ]);
  };

  const deleteList = (id: string) => {
    setGlobalState(globalState.filter((list) => list?.id !== id));
  };

  const updateList = (list: ListType) => {
    const updatedList = globalState.map((item) => {
      if (item.id === list.id) {
        return list;
      }
      return item;
    });
    setGlobalState(updatedList);
  };

  return (
    <div className="wrapper">
      <Header createList={createList} />
      <div
        id="board"
        className="container"
      >
        {globalState.length > 0
          ? globalState.map((list, i) => (
              <List
                key={list.id}
                listState={list}
                setListState={updateList}
                deleteList={deleteList}
                isFocused={i === 0 ? true : false}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Board;
