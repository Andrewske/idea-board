// Global Styles
import './App.css';

// Components
import Board from './components/Board';
import Footer from './components/Footer';

// Hooks
import usePersistState from './hooks/usePersistState';

function App() {
  const [listsState, setListsState] = usePersistState({
    storeKey: 'global',
    initialState: [],
  });

  return (
    <>
      <Board
        listsState={listsState}
        setListsState={setListsState}
      />
      <Footer />
    </>
  );
}

export default App;
