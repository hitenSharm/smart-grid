import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Adminpanel from './components/admin/adminPanel';
import Auctions from './components/auctions/auctionsList';
import Auction from './components/auctions/auction';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<App/>}></Route>
        <Route exact path='/admin' element={<Adminpanel/>}></Route>
        <Route exact path='/auctions' element={<Auctions/>}></Route>
        <Route exact path='/auction/:id' element={<Auction/>}></Route>        
      </Routes>
      </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
