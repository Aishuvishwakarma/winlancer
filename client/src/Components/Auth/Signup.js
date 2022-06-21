import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "../../Config/AxiosConfig"

function Signup() {
    const history = useNavigate()
    const [state, setstate] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
      if(localStorage.token && window.location.pathname === '/signup'){
        history('/home')
      }
    }, [null])
    

    const OnChangeHandler = (e) => {
        setstate((prevState) => {
            return ({
                ...prevState, [e.target.name]: e.target.value
            })
        })
    }
    const OnSubmitData =()=>{
      if(state.username!==''&&state.password!==''){
        axios.post('/signup',{...state})
        .then((response)=>{
          notify(response.data.message)
          history('/')
        })
        .catch((error)=>{
          notify(error.response.data.message)
        })
      }
       
     }
     
     const notify = (msg) => toast(msg);
    return (
        <Container>
            <ToastContainer />
            <Form>
                <Heading>SignUP</Heading>
                <Text>Username</Text>
                <Input type='text' name='username' onChange={(e)=>OnChangeHandler(e)} placeholder='username' />
                <Text>Password</Text>
                <Input type='password' name='password' onChange={(e)=>OnChangeHandler(e)} placeholder='password' />
                <Button onClick={OnSubmitData} >SignUP</Button>
            </Form>
        </Container>
    )
}

export default Signup



const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 6rem 30rem;
  background-color: #f2f2f2;`

const Form = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 3px 10px 0px #8883;
  padding:0 30px;
  border-radius:5px;
  display:flex;
  justify-content: center;
  flex-direction: column;`

const Heading = styled.h2`
  font-size: 30px;
  color:#000;
  margin-bottom: 15px;`

const Text = styled.h2`
  font-size: 15px;
  color:#000;`

const Input = styled.input`
  width: 100%;
  height:50px;
  padding: 0 10px;
  margin: 15px 0;
  border:1px solid #dddd;
  outline:none;
  border-radius:5px;`

const Button = styled.button`
  height:50px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid #219ebc;
  color: #219ebc;
  padding: 0.25em 1em;
`