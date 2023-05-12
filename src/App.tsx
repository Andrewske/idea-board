// Global Styles
import './App.css';

// Components
import Board from './components/Board';

// Hooks
import usePersistState from './hooks/usePersistState';

function App() {
  const [globalState, setGlobalState] = usePersistState({
    storeKey: 'global',
    initialState: [],
  });

  return (
    <main>
      <Board
        globalState={globalState}
        setGlobalState={setGlobalState}
      />
    </main>
  );
}

export default App;
