import { useState, useEffect } from 'react';

type PersistStateProps = {
  storeKey: string;
  initialState: [];
};

const usePersistState = ({
  storeKey = '',
  initialState,
}: PersistStateProps) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const persistedState = JSON.parse(localStorage.getItem(storeKey) ?? '{}');

    if (persistedState) {
      setInternalState(persistedState);
    }
  }, [storeKey]);

  const setState = (newState: []) => {
    localStorage.setItem(storeKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};

export default usePersistState;
