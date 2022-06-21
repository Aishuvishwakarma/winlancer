import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Homepage from "./Components/Homepage";
import axios from "./Config/AxiosConfig";
class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      isloggedin:false
    }
  }

  componentDidMount(){
    if(localStorage.token){
      axios.defaults.headers.common['auth-token'] = localStorage.token;
    } else{
        delete axios.defaults.headers.common['auth-token'];
        
    }
  }
  
  render() {

    return (
      <>
        <BrowserRouter> 
          <Routes>
        <Route path='/'  element={<Signin/>}/>
        <Route path='/Signup'  element={<Signup/>}/>
        <Route path='/home'  element={<Homepage/>}/>

      </Routes>
        </BrowserRouter>
      </>
    )
  }
}
export default App;

