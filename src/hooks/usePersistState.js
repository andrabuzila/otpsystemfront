import { useState, useEffect} from "react";

export const usePersistState = (storageKey, initialState) => {

    // Initiate the internal state.
    const [state, setInternalState] = useState(initialState);
  
    // Only on our initial load, retrieve the data from the store and set the state to that data.
    useEffect(() => {
      
      var storageInLocalStorage;
      // Retrieve the data from the store.
      if(localStorage.getItem(storageKey) !== null){
        if(localStorage.getItem(storageKey).toLowerCase() === 'true' || localStorage.getItem(storageKey).toLowerCase() === 'false'){
          storageInLocalStorage = localStorage.getItem(storageKey).toLowerCase() === 'true';
        }else{
            storageInLocalStorage = localStorage.getItem(storageKey);
        }
      }else{
        storageInLocalStorage = null;
      }
      // If the store exists, overwrite the state with the store's data.
      // Otherwise if the store doesn't exist then "initialState" remains our default value.
      if (storageInLocalStorage) {
        setInternalState(storageInLocalStorage);
      }
    }, []);
  
    // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
    const setState = (newState) => {
      localStorage.setItem(storageKey, newState);
      setInternalState(newState);
    };
  
    return [state, setState];
  };