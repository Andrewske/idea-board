// Global Styles
import './App.css';

// Components
import Board from './components/Board';
import Footer from './components/Footer';

// Hooks
import usePersistState from './hooks/usePersistState';

function App() {
  const [globalState, setGlobalState] = usePersistState({
    storeKey: 'global',
    initialState: [],
  });

  return (
    <>
      <Board
        globalState={globalState}
        setGlobalState={setGlobalState}
      />
      <Footer />
    </>
  );
}

export default App;
