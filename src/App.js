import './App.css';
import Map from "./components/Map";
import LeftScreenController from "./components/LeftScreenController";
import Navbar from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {logUser} from "./redux/loggedUserSlice";
import {useEffect} from "react";
import axios from "axios";
import {setCategories} from "./redux/categoriesSlice";

function App() {
    const dispatch = useDispatch();
    const categoriesSelector = useSelector(state => state.categories)
    const BACKEND_URL = 'http://localhost:5000'
    let categories;

    useEffect(() => {
        let potencialLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        if(potencialLoggedUser !== null && potencialLoggedUser.validTo < Date.now){
            dispatch(logUser(potencialLoggedUser));
        }
        getCategoriesFromAPI();
        dispatch(setCategories(categories));
        console.log(categoriesSelector.categories);
    }, []);

    function getCategoriesFromAPI() {
        axios.get(BACKEND_URL + '/category/all')
            .then(function (response) {
                console.log(response.data)
                categories = response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    return (
      <div id='app-root' className='h-screen w-screen m-0 flex overflow-hidden navbar-color'>
        <Navbar/>
        <LeftScreenController/>
        <Map className='leaflet-container'/>
      </div>
  );
}

export default App;
