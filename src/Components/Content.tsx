import React, {useContext} from 'react';
import StoreContext from '@StoreContext';

const ContentApp = () => {
    // @ts-ignore
    const { store } = useContext(StoreContext);
    return <>
        {JSON.stringify(store.getData)}
        </>
};

export default ContentApp;
