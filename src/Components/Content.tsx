import React, {useContext} from 'react';
import StoreContext from '@StoreContext';
import { observer } from 'mobx-react-lite'

const ContentApp = observer(() => {
    const { store } = useContext(StoreContext);
    return <>
        {JSON.stringify(store.getData)}
        </>
});

export default ContentApp;
