import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Add from './components/Add';
import SearchBar from './components/searchBar';
import LED from './components/LED';
import Control from './components/Control';
import Home from './components/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auto" element={<SearchBar/>} />
          <Route path="manual" element={<Control/>} />
          <Route path="add" element={<Add />} />
          <Route path="led" element={<LED />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

