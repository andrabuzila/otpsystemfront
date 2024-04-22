import { useState, useEffect} from "react";

export const usePersistState = (storageKey, initialState) => {

    const [state, setInternalState] = useState(initialState);
  
    
    useEffect(() => {
      
      var storageInLocalStorage;
      
      if(localStorage.getItem(storageKey) !== null){
        if(localStorage.getItem(storageKey).toLowerCase() === 'true' || localStorage.getItem(storageKey).toLowerCase() === 'false'){
          storageInLocalStorage = localStorage.getItem(storageKey).toLowerCase() === 'true';
        }else{
            storageInLocalStorage = localStorage.getItem(storageKey);
        }
      }else{
        storageInLocalStorage = null;
      }
      
      if (storageInLocalStorage) {
        setInternalState(storageInLocalStorage);
      }
    }, []);
  
    const setState = (newState) => {
      localStorage.setItem(storageKey, newState);
      setInternalState(newState);
    };
  
    return [state, setState];
  };