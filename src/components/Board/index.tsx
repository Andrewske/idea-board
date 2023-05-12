import { v4 as uuidv4 } from 'uuid';
import { ListType } from '../../types';
import List from '../List';

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

  // Might not be necessary try again with a media query
  //   const { width } = useWindowSize();

  //   const { scrollLeft, scrollRight } = useScroll();

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
    <div>
      <header className="header">
        <img
          className="icon"
          src="/icons/icons8-add-50.png"
          alt="delete"
          onClick={createList}
        />
      </header>
      <div className="main-container">
        {/* {width > 400 && (
          <div className="icon-btn">
            <img
              className="icon"
              src="/icons/icons8-back-arrow-50.png"
              alt="delete"
              onClick={scrollLeft}
            />
          </div>
        )} */}

        <div
          id="board"
          className="board"
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
        {/* {width > 400 && (
          <div className="icon-btn right">
            <img
              className="icon"
              src="/icons/icons8-circled-right-50.png"
              alt="delete"
              onClick={scrollRight}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Board;
