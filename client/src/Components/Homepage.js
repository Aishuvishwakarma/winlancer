import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import jwtdecode from 'jwt-decode'
import { v4 } from 'uuid'
import axios from 'axios';
function Homepage() {

  const history = useNavigate()

  const [state, setstate] = useState({
    first_name: '',
    last_name: '',
    email: '',
    id: v4(),
    user: {
      username: '',
      password: ''
    },
    Refusers: []
  })

  useEffect(() => {

    if (!localStorage.token) {
      history('/')
      delete axios.defaults.headers.common['auth-token'];
    }

    if (localStorage.token) {
      axios.defaults.headers.common['auth-token'] = localStorage.token;
      const loadUser = jwtdecode(localStorage.token)
      setstate((prevState) => {
        return ({
          ...prevState, user: loadUser.user, Refusers: loadUser.user.Refusers
        })
      })
      GetUsers()


    }
  }, [null])


  const OnsignOut = () => {
    localStorage.removeItem('token')
    history('/')
  }

  const GetUsers = () => {
    if (localStorage.token) {
      axios.defaults.headers.common['auth-token'] = localStorage.token;
    }
    axios.get('/getuser')
      .then((response) => {
        setstate((prevState) => {
          return ({
            ...prevState, Refusers: response.data.Users
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const OnChangeHandler = (e) => {
    setstate((prevState) => {
      return ({
        ...prevState, [e.target.name]: e.target.value
      })
    })
  }

  const OnSubmitData = () => {


    if (state.first_name !== '' && state.last_name !== '' && state.email !== '') {
      let obj = {}
      obj.first_name = state.first_name
      obj.last_name = state.last_name
      obj.email = state.email
      obj.id = state.id
      axios.post('/adduser', { ...obj })
        .then((response) => {
          GetUsers()
          notify(response.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }

  const onDeleteUser = (id)=>{

  axios.delete(`/deleteuser/${id}`)
  .then((response)=>{
   GetUsers()
  })
  .catch((error)=>console.log(error))
  }
  console.log(state)

  const notify = (msg) => toast(msg);

  const UserList = state.Refusers.map((user, k) => {
    return <>
      <Col>
        <h5>{user.first_name}</h5>
        <h5>{user.last_name}</h5>
        <h5>{user.email}</h5>
        <Button onClick={() => onDeleteUser(user._id)} style={{ height: '40px' }}>delete</Button>
      </Col>
    </>
  })

  return (
    <>
      <Container>
        <ToastContainer />
        <Header>
          {/* <Heading>this is Home Page of {state.user.username}</Heading> */}
          <Text>Hello !{state.user.username}</Text>
          <Button onClick={OnsignOut} >Logout</Button>
        </Header>
        <ContainerBX>
          <Form>
            <Heading>Create User</Heading>
            <Text>First Name</Text>
            <Input type='text' name='first_name' onChange={(e) => OnChangeHandler(e)} placeholder='First name' />
            <Text>Last Name</Text>
            <Input type='text' name='last_name' onChange={(e) => OnChangeHandler(e)} placeholder='Last name' />
            <Text>Email</Text>
            <Input type='email' name='email' onChange={(e) => OnChangeHandler(e)} placeholder='Email' />
            <Button onClick={OnSubmitData} >SignIn</Button>
          </Form>
          <UserListBx>
            {UserList}
          </UserListBx>
        </ContainerBX>
      </Container>
    </>
  )
}

export default Homepage


const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem 2rem;
  background-color: #f2f2f2;`

const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  display:flex;
  justify-content:space-between;
  align-itmes:center;
  `
const ContainerBX = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  background-color: #f2f2f2;
  display:flex`

const Form = styled.div`
  width: 400px;
  height: 100%;
  background-color: white;
  box-shadow: 0px 3px 10px 0px #8883;
  padding:0 30px;
  border-radius:5px;
  display:flex;
  justify-content: center;
  flex-direction: column;`

const UserListBx = styled.div`
  width: calc(100% - 400px);
  height: 100%;
  box-shadow: 0px 3px 10px 0px #8883;
  padding:10px 30px;
  border-radius:5px;
  display:flex;
  flex-direction:column;;`

const Col = styled.div`
  width: calc100%;
  height: 50px;
  background-color: white;
  box-shadow: 0px 3px 10px 0px #8883;
  border-radius:5px;
  display:flex;
  justify-content: space-between;
  align-itmes:center;
  margin-top:20px;
  padding:10px 30px;`

const Input = styled.input`
  width: 100%;
  height:50px;
  padding: 0 10px;
  margin: 15px 0;
  border:1px solid #dddd;
  outline:none;
  border-radius:5px;`



const Heading = styled.h2`
  font-size: 30px;
  color:#000;
  margin-bottom: 15px;`

const Text = styled.h2`
  font-size: 20px;
  color:#000;`


const Button = styled.button`
  height:50px;
  background: transparent;
  border-radius: 3px;
  border: 2px solid #219ebc;
  color: #219ebc;
  padding: 0.25em 1em;
`