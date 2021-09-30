import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css";
import "./style.scss";
import './i18n/index.ts';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
