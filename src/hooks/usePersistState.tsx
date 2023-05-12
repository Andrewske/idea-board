import { useState, useEffect } from 'react';
import { ListType } from '../types';

interface PersistStateProps {
  storeKey: string;
  initialState: ListType[];
}

const usePersistState = ({
  storeKey = '',
  initialState,
}: PersistStateProps): [ListType[], (newState: ListType[]) => void] => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const persistedState = JSON.parse(localStorage.getItem(storeKey) ?? '{}');

    if (persistedState) {
      setInternalState(persistedState);
    }
  }, [storeKey]);

  const setState = (newState: ListType[]) => {
    localStorage.setItem(storeKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};

export default usePersistState;
