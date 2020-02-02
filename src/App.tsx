import React  from 'react';
import { observer, useObservable } from 'mobx-react-lite'
import StoreContext from '@StoreContext';
import { Spin } from 'antd';

import MenuApp from "./Components/Menu";
import ContentApp from "./Components/Content";
import './App.css';

const App = observer(() => {
    const store = useObservable({
        data: {},
        mapData: [{}],
        loading: false,
        menuKey: 'summarize',
        setData(data: any): any {
            store.data = JSON.parse(JSON.stringify(data));
        },
        setLoading(loading: boolean): void {
            store.loading = loading;
        },
        setMenuKey(data: string): void {
            store.menuKey = data;
        },
        setMapData(data: Array<object>): void {
            store.mapData = data;
        },
        get getData(): any {
            return JSON.parse(JSON.stringify(store.data));
        },
        get getLoading(): boolean {
            return store.loading;
        },
        get getMenuKey(): string {
            return store.menuKey;
        },
        get getMapData(): Array<object> {
            return store.mapData;
        }
    });
    return (
          <StoreContext.Provider
              value={{store}}
          >
              <Spin spinning={store.getLoading}>
                  <div className="App">
                      <MenuApp></MenuApp>
                      <ContentApp/>
                  </div>
              </Spin>
          </StoreContext.Provider>
  );
});

export default App;
