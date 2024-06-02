import React from 'react';
import {Routes,Route} from "react-router-dom"
import Home from './layout/home/home';
import Analytics from './layout/analytics/analytics';
import Activity from './layout/activity/activity';


const Main = () => {
  return (
    <Routes>
        <Route path='/' element={<Analytics/>} />
        <Route path='/analytics' element={<Activity/>} />
        <Route path='/activity' element={<Home/>} />
    </Routes>
  )
}

export default Main