import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLabel,styled } from '@mui/material';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import CheckoutStatus from './CheckoutStatus';
//import Message from '../components/Message';
import Loading from '../layout/Loading';
import { createOrders } from '../../store/actions/orderActions';
import { CART_RESET } from '../../store/actionTypes/cartConstants';
import { refreshLogin, getUserDetails } from '../../store/actions/authActions';

const Placeorder = () => {
	const dispatch = useDispatch();
        const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { cartInfo, shippingAddress, paymentMethod } = cart;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, loading, success, error } = orderCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
//alert(paymentMethod)
	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// fetch the userinfo from reducx store
	useEffect(() => {
                // eslint-disable-next-line no-unused-expressions
		userInfo? dispatch(getUserDetails(userInfo._id)): '';
	}, [userInfo, dispatch]);

	// refresh access token when user detail throws error
	/*useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(sessionStorage.getItem('userInfo'));
			//user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);*/

	useEffect(() => {
               // alert(success);//return;
		if (success) {
			sessionStorage.removeItem('cartInfo');
			dispatch({ type: CART_RESET, payload: shippingAddress }); // remove items from cart once paid, but keep the shipping address in store
			navigate(`/order/${order._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success]);

	// All prices, tax is randomly  assigned
	cart.rate = cartInfo.reduce(
		(acc, item) => acc + item.rate * item.qty,
		0
	);

	cart.shippingPrice = cart.rate > 8000 ? 500 : 300;
	cart.taxPrice = 0.18 * cart.rate;
	cart.totalPrice = cart.rate + cart.taxPrice + cart.shippingPrice;

	const handleOrder = (e) => {
		//e.preventDefault();
		dispatch(
			createOrders({
				orderItems: cartInfo,
				shippingAddress,
				paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

  return (
        <>
        {/* last step in the ckecout process */}
        <CheckoutStatus step1 step2 step3 step4 />
        <Row>
        {loading ? (
                <Loading />
        ) : (
                <>
                <Col md={8}>
                        <ListGroup variant='flush'>
                                <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                                <strong>Address: </strong>{' '}
                                                {shippingAddress.address},{' '}
                                                {shippingAddress.city}-
                                                {shippingAddress.postalcode},{' '}
                                                {shippingAddress.country}
                                        </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                                <strong>Method: </strong>{' '}
                                                {paymentMethod}
                                        </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <h2>Cart Items</h2>
                                        {cartInfo.length !== 0 ? (
                                            <ListGroup variant='flush'>
                                                {cartInfo.map((item, idx) => (
                                                        <ListGroup.Item key={idx}>
                                                        <Row>
                                                        <Col md={2}>
                                                                <Image
                                                                        className='product-image'
                                                                        src={item.image.url}
                                                                        alt={item.name}
                                                                        fluid
                                                                        rounded
                                                                />
                                                        </Col>
                                                        <Col>
                                                                <Link
                                                                        to={`/product/${item._id}`}>
                                                                        {item.name}
                                                                </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                                {item.qty} x{' '}
                                                                {item.price} ={' '}
                                                                {(
                                                                        item.qty *
                                                                        item.rate
                                                                ).toLocaleString(
                                                                        'en-IN',
                                                                        {
                                                                                maximumFractionDigits: 2,
                                                                                style: 'currency',
                                                                                currency:
                                                                                        'INR',
                                                                        }
                                                                )}
                                                        </Col>
                                                        </Row>
                                                        </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                                <Spannings id="iamges">Your cart is empty</Spannings>
                                        )}
                                </ListGroup.Item>
                        </ListGroup>
                </Col>
                <Col md={4}>
                        <Card>
                                <ListGroup variant='flush'>
                                        <ListGroup.Item className='text-center'>
                                                <h2 className='text-center'>
                                                        Order Summary
                                                </h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                                <Row>
                                                        <Col>
                                                                <strong>Subtotal</strong>
                                                        </Col>
                                                        <Col>
                                                                {Number(
                                                                        cart.rate
                                                                ).toLocaleString('en-IN', {
                                                                        maximumFractionDigits: 2,
                                                                        style: 'currency',
                                                                        currency: 'INR',
                                                                })}
                                                        </Col>
                                                </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                                <Row>
                                                        <Col>
                                                                <strong>Shipping</strong>
                                                        </Col>
                                                        <Col>
                                                                {Number(
                                                                        cart.shippingPrice
                                                                ).toLocaleString('en-IN', {
                                                                        maximumFractionDigits: 2,
                                                                        style: 'currency',
                                                                        currency: 'INR',
                                                                })}
                                                        </Col>
                                                </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                                <Row>
                                                        <Col>
                                                                <strong>Tax</strong>
                                                        </Col>
                                                        <Col>
                                                                {Number(
                                                                        cart.taxPrice
                                                                ).toLocaleString('en-IN', {
                                                                        maximumFractionDigits: 2,
                                                                        style: 'currency',
                                                                        currency: 'INR',
                                                                })}
                                                        </Col>
                                                </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                                <Row>
                                                        <Col>
                                                                <strong>Total</strong>
                                                        </Col>
                                                        <Col>
                                                                {Number(
                                                                        cart.totalPrice
                                                                ).toLocaleString('en-IN', {
                                                                        maximumFractionDigits: 2,
                                                                        style: 'currency',
                                                                        currency: 'INR',
                                                                })}
                                                        </Col>
                                                </Row>
                                        </ListGroup.Item>
                                        {error && (
                                                <ListGroup.Item>
                                                        <Spannings>
                                                                {error}
                                                        </Spannings>
                                                </ListGroup.Item>
                                        )}
                                        <ListGroup.Item className='d-grid gap-2'>
                                                <Button
                                                        type='button'
                                                        size='lg'
                                                        disabled={!cartInfo.length}
                                                        onClick={handleOrder}>
                                                        Place Order
                                                </Button>
                                        </ListGroup.Item>
                                </ListGroup>
                        </Card>
                </Col>
                </>
        )}
     </Row>
     </>
   );
};

export default Placeorder;
const Spannings =  styled(FormLabel)`
color: white;
font-size:13px;
background-color:red;
`
/*const Spannings2 =  styled(FormLabel)`
color: white;
font-size:13px;
background-color:red;
`*/
