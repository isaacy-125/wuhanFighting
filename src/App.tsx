import React from 'react';
import './App.css';
import { DatePicker } from 'antd';
import fetch from './API/axios';

const App = () => {
    console.log(fetch);
  return (
    <div className="App">
        <DatePicker></DatePicker>
    </div>
  );
}

export default App;
