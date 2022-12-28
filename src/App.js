import './App.css';
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import Register from "./pages/Register"
import Recognize from "./pages/Recognize"
import {withAuthenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/collection" element= {<Collection/>}/>
      <Route path="/register" element= {<Register/>}/>
      <Route path="/recognize" element= {<Recognize/>}/>
    </Routes>
  );
}

export default withAuthenticator(App);
