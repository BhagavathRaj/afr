import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form'
import {Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/esm/Button";
import Axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";




 export default function  SigninScreen(){
    const navigate=useNavigate();
    const {search}=useLocation();   
    const redirectInUrl= new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl?redirectInUrl:'/';
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const{state,dispatch:ctxDispatch}=useContext(Store);
    const{userInfo}=state
    const handleSubmit=async(e)=>{
 e.preventDefault();
 try{
    const {data}= await Axios.post('/api/users/signin', {
        email,
        password,
        
    });  console.log(data);
    ctxDispatch ({type:'USER_SIGNIN',payload:data})
    localStorage.setItem('userInfo',JSON.stringify(data))
    navigate(redirect || '/')
 }

 catch(err){
  toast.error("Invali de email or password")
 }
    }
useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
},[navigate,redirect,userInfo]);


    return(
        <Container className="smallcontainer">
            <Helmet>
                <title>Signup Page</title>
            </Helmet>
            <h1 className="my-3">Sign in </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlid="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} required/>

                </Form.Group>
                <Form.Group  className="mb-3" controlid="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={ (e)=>setPassword(e.target.value)} required/>

                </Form.Group>
                <div className="mb-3" controlid="email">
                   <Button type="submit">Sign in </Button>

                </div>
                <div className="mb-3">
                    NewCustomer?{''}
                    <Link to={`/signup?redirect=${redirect}`}>Create Your Account </Link>
                </div>
            </Form>

        </Container>
    )

 }