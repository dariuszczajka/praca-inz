import './App.css';
import Map from "./components/Map";
import Offers from "./components/Offers";

function App() {
  return (
      <div className='root'>
        <Offers/>
        <Map className='leaflet-container'/>
      </div>
  );
}

export default App;
