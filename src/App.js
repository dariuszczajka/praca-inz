import './App.css';
import Map from "./components/Map";
import Offers from "./components/Offers";
import Navbar from "./components/Navbar";

function App() {

  return (
      <div className='h-screen w-screen m-0'>
        <Navbar/>
        <Offers/>
        <Map className='leaflet-container'/>
      </div>
  );
}

export default App;
