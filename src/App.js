import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import MusicSheet from './pages/musicSheet';
import MusicSheetList from './pages/musicSheetList';
import SheetRender from './pages/sheetRender';
 
class App extends Component{
   render(){
      return(

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="musicSheet" element={<MusicSheet />} />
            <Route path="musicSheetList" element={<MusicSheetList />} />
            <Route path="sheetRender" element={<SheetRender />} />
         </Routes>
      );
   }
}
export default App;