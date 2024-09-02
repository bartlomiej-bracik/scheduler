import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import Demo from './Demo';
import reportWebVitals from './reportWebVitals';
//import '@devexpress/dx-react-scheduler-material-ui/dist/dx-react-scheduler-material-ui.css'; // Importowanie stylów DevExtreme
import '@mui/material/styles'; // Importowanie stylów Material-UI
import Demo from './Demo';
import Baza from './Baza';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Demo/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
