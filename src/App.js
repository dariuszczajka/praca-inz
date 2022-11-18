import './App.css';
import Map from "./components/Map";
import Offers from "./components/Offers";
import Navbar from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {logUser} from "./redux/loggedUserSlice";

function App() {
    const dispatch = useDispatch();

    let potencialLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if(potencialLoggedUser !== null && potencialLoggedUser.validTo < Date.now){
        dispatch(logUser(potencialLoggedUser));
    }

    return (
      <div id='app-root' className='h-screen w-screen m-0 flex overflow-hidden navbar-color'>
        <Navbar/>
        <Offers/>
        <Map className='leaflet-container'/>
      </div>
  );
}

export default App;
