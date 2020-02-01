import React  from 'react';
import { observer, useObservable } from 'mobx-react-lite'
import StoreContext from '@StoreContext';

import MenuApp from "./Components/Menu";
import ContentApp from "./Components/Content";
import './App.css';

const App = observer(() => {
    const store = useObservable({
        data: {},
        setData(data: any): any {
            store.data = JSON.parse(JSON.stringify(data));
        },
        get getData(): any {
            return JSON.parse(JSON.stringify(store.data));
        },
    });
    return (
          <StoreContext.Provider
              value={{store}}
          >
              <div className="App">
                  <MenuApp></MenuApp>
                  <ContentApp/>
              </div>
          </StoreContext.Provider>
  );
});

export default App;
