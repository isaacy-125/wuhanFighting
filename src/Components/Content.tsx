import React, {useContext} from 'react';
import StoreContext from '@StoreContext';
import { observer } from 'mobx-react-lite'

const ContentApp = observer(() => {
    const { store } = useContext(StoreContext);
    const data = store.getData[0] || {};
    const getComponent = () => {
      switch (store.getMenuKey) {
          case 'summarize':
              const SummarizeApp = React.lazy(() => import('./summarize'));
              return <SummarizeApp data={data}></SummarizeApp>;
          case 'trend':
              const TrendApp = React.lazy(() => import('./Trend'));
              return <TrendApp data={data}></TrendApp>
          case 'map':
              const MapApp = React.lazy(() => import('./MapApp'));
              return <MapApp></MapApp>
          default:
              break;
      }
    };
    return <>
            <React.Suspense fallback={<div>Loading...</div>}>
                {getComponent()}
            </React.Suspense>
        </>
});

export default ContentApp;
