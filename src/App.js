import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screen/Homescreen';
import ProductScreen from './screen/ProductScreen';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ToastContainer,toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShipingAddressScreen from './screen/ShipingAddressScreen';
import SignUpScreen from './screen/SignUpScreen ';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';


function App() {
  const { state,dispatch:ctxDispatch } = useContext(Store);
  const { cart,userInfo } = state;
  const signoutHandler=()=>{
    ctxDispatch({type:'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position='bottom-center' limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazonz</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>UserProfile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                      <Link className="dropdown-item" to="#signout" onClick={signoutHandler} >signout</Link>
                    

                     </NavDropdown>
                ):(
                <Link className="nav-link" to="/signin" >Signin
                 </Link>  
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<Homescreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen/>} />
              <Route path="/shiping" element={<ShipingAddressScreen/>} />
              <Route path="/signup" element={<SignUpScreen/>} />
              <Route path="/payment" element={<PaymentMethodScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>}/>
            </Routes>
          </Container>
        </main>

        <footer>
          {' '}
          <div className="text-center"> All rights reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
