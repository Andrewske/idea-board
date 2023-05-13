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
  // create a new list and save it in the global state
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
    // loop through lists and replace old list with new list
    const updatedList = globalState.map((item) => {
      return item.id === list.id ? list : item;
    });

    setGlobalState(updatedList);
  };

  return (
    <div className="wrapper">
      <Header createList={createList} />
      <div className="container">
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
      </div>
    </div>
  );
};

export default Board;
