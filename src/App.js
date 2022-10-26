import './App.css';
import Map from "./components/Map";
import Offers from "./components/Offers";
import * as data from './data/offers.json';
import {useState} from "react";

function App() {

  return (
      <div className='root'>
        <Offers data={data}/>
        <Map className='leaflet-container' data={data}/>
      </div>
  );
}

export default App;
