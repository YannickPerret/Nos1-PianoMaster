import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import MusicComposer from './pages/musicComposer';
import MusicSheet from './pages/musicSheet';
import Search from './pages/search';
import User from './pages/user';
 
class App extends Component{
   render(){
      return(

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="musicSheet" element={<MusicSheet />} />
            <Route path="musicSheet/:id" element={<MusicSheet />} />
            <Route path="musicSheetList" element={<MusicComposer />} />
            <Route path="search" element={<Search />} />
            <Route path="users" element={<User />} />
            <Route path="users/:id" element={<User />} />
         </Routes>
      );
   }
}
export default App;