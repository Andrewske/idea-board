import { v4 as uuidv4 } from 'uuid';

type BoardProps = {
  globalState: [];
  setGlobalState: () => void;
};

type ListObject = {
  id: string;
};

const Board = ({ globalState, setGlobalState }: BoardProps) => {
  // Might not be necessary try again with a media query
  //   const { width } = useWindowSize();

  //   const { scrollLeft, scrollRight } = useScroll();

  const createList = () => {
    setGlobalState([
      ...globalState,
      { id: uuidv4(), title: 'new title', items: [] },
    ]);
  };

  const deleteList = (id: string) => {
    setGlobalState([globalState.filter((list) => list?.id !== id)]);
  };

  const updateList = (list: ListObject) => {
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
                // <List
                //   key={list.id}
                //   state={list}
                //   setState={updateList}
                //   deleteList={deleteList}
                //   isFocused={i === 0 ? true : false}
                // />
                <div />
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
