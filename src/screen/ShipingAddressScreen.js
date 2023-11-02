import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../Components/CheckOutSteps';

export default function ShipingAddressScreen() {
    const navigate =useNavigate();
   
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {
        userInfo,
        cart:{shippingAddress}
    }=state;
    const [fullname,setFullname]=useState( shippingAddress.fullname ||'');
    const[address,setAddress]=useState( shippingAddress.address||'');
    const[city,setCity]=useState( shippingAddress.city||'');
    const[postalcode,setPostalcode]=useState( shippingAddress.postalcode|| '');
    const[country,setCountry]=useState( shippingAddress.country||'');
   useEffect(()=>{
    if(!userInfo){
        navigate('/signin?redirect=/shiping')
    }
   },[userInfo,navigate])

    const handleSubmit=(e)=>{
        e.preventDefault();
        ctxDispatch({
            type:'SAVE_SHIPING_ADDRESS',
            payload:{
                fullname,
                address,
                city,
                postalcode,
                country
            }
        })
  localStorage.setItem(
    'shippingAddress',
    JSON.stringify({
        fullname,
        address,
        city,
        postalcode,
        country,

    })
  );
  navigate('/payment')
    }
  return (
    <div>
<Helmet>
   <title>ShipingAddress</title>
</Helmet>

<CheckOutSteps step1 step2></CheckOutSteps>
<h1 className='my-3'>Shiping Address</h1>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlid="fullname">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control value={fullname} onChange={(e)=>setFullname(e.target.value)} required/>

                </Form.Group>
                <Form.Group className="mb-3" controlid="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={address} onChange={(e)=>setAddress(e.target.value)} required/>

                </Form.Group>
                <Form.Group className="mb-3" controlid="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} required/>

                </Form.Group>
                <Form.Group className="mb-3" controlid="postalcode">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control value={postalcode} onChange={(e)=>setPostalcode(e.target.value)} required/>

                </Form.Group>
                <Form.Group className="mb-3" controlid="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={country} onChange={(e)=>setCountry(e.target.value)} required/>

                </Form.Group>
                <div className='mb-3'>
                <Button variant='primary' type='submit' >
                Continue
                
                </Button>
                </div>
               
                
    
</Form>



    </div>
  )
}
