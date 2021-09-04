import React, {createContext, useState} from 'react';

import {apiProperties} from '../utils/properties';

export const AppContext = createContext();

const AppContextProvider = props => {
  const [dataApp, setDataApp] = useState(apiProperties);

  return (
    <AppContext.Provider
      value={{
        dataApp,
        setDataApp,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
