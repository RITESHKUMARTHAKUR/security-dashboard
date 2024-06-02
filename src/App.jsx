import { useState } from 'react'
import './App.css';
import { dashboard_data } from './eve';
import Home from "./components/layout/home/home";
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Nav from './components/layout/nav/nav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Nav/>
      <Main />
    </BrowserRouter>
  )
}

export default App
