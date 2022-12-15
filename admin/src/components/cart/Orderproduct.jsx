import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLabel,styled } from '@mui/material';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Message from '../Message';
import Loading from '../layout/Loading';
import {
	getOrderDetails,
	payOrders,
	deliverOrders,
} from '../../store/actions/orderActions';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../../store/actionTypes/orderConstants';
import { savePaymentMethod } from '../../store/actions/cartActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; //stripe checkout form
import getDateString from '../../utils/getDateString';

const Orderproduct = () => {
       // const navigate = useNavigate();
        const {id} = useParams();
        const orderID = id;
	// load stripe
	const stripePromise = loadStripe(
		process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
	);
	// for paypal payment
        const [ errors, setErrors ] = useState();
        const itemQWithId = [];

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;
        if(order && order.orderItems!==null){
                order.orderItems.map((itemQ) => {itemQWithId.push(itemQ._id+'-'+itemQ.qty)});
                //console.log(JSON.stringify(order.orderItems[0]))
        }
        //console.log(JSON.stringify(itemQWithId))
	// get new access tokens using the refresh token, is user details throws an error

	// set order to paid or delivered, and fetch updated orders
	useEffect(() => {
		if (!order || order._id !== orderID || successPay || successDeliver) {
			if (successPay) dispatch({ type: ORDER_PAY_RESET });
			if (successDeliver) dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderID));
		}
	}, [order, orderID, dispatch, successPay, successDeliver]);

	// save the payment mthod as paypal
	const successPaymentHandler = (data, actions) => {
                actions.order.capture(data.orderID).then(details => {
                        //adding item quntity to payment details to update product quantity to product collection
                        details.itemQWithId=itemQWithId;
                        dispatch(savePaymentMethod('PayPal'));
                        dispatch(
                                payOrders(orderID, { ...details, paymentMode: 'paypal' })
                        );
                        });
		
	};

	// set order as delivered
	const successDeliveryHandler = () => {
		dispatch(deliverOrders(orderID));
	};

return loading ? (
		<Loading />
	) : error ? (
		<Spannings >
			{error}
		</Spannings>
	) : (
<>
<h2>Order {orderID}</h2>
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
                                        <strong>Name: </strong>
                                        {order.user.name}
                                </p>
                                <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>
                                                {order.user.email}
                                        </a>
                                </p>
                                {order.paymentMethod === 'Paypal'?'':
                                <p>
                                        <strong>Address: </strong>{' '}
                                        {order.shippingAddress.address},{' '}
                                        {order.shippingAddress.city}-
                                        {order.shippingAddress.postalcode},{' '}
                                        {order.shippingAddress.country}
                                </p>
                                }
                                <div>
                                        {order.isDelivered ? (
                                                <Spannings variant='success' >
                                                        Delivered at:{' '}
                                                        {getDateString(
                                                                order.deliveredAt
                                                        )}
                                                </Spannings>
                                        ) : (
                                                <Spannings2 variant='danger'>
                                                        Not Delivered
                                                </Spannings2>
                                        )}
                                </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                        <strong>Method: </strong>{' '}
                                        {order.paymentMethod}
                                </p>
                                <div>
                                        {order.isPaid ? (
                                                <Spannings variant='success'>
                                                        Paid at:{' '}
                                                        {getDateString(order.paidAt)}
                                                </Spannings>
                                        ) : (
                                                <Spannings2 variant='danger'>
                                                        Not Paid
                                                </Spannings2>
                                        )}
                                </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                <h2>Cart Items</h2>
                                {order.orderItems.length !== 0 ? (
                                        <ListGroup variant='flush'>
                                          <div
                                                        style={{
                                                                background: 'red',
                                                        }}></div>
                                                {order.orderItems.map(
                                                (item, idx) => (
                                                        <ListGroup.Item key={idx}>
                                                        <Row>
                                                        <Col md={2}>
                                                                <Image
                                                                        className='product-image'
                                                                        src={
                                                                                item.image.url
                                                                        }
                                                                        alt={
                                                                                item.name
                                                                        }
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
                                                                {item.rate} ={' '}
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
                                                )
                                                )}
                                        </ListGroup>
                                ) : (
                                        <Spannings>No order</Spannings>
                                )}
                        </ListGroup.Item>
                </ListGroup>
        </Col>
        <Col md={4}>
                <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                        <h2 className='text-center'>
                                Order Summary
                        </h2>
                </ListGroup.Item>
                {error && (
                        <ListGroup.Item>
                                <Spannings
                                        dismissible
                                        variant='danger'
                                        duration={10}>
                                        {error}
                                </Spannings>
                        </ListGroup.Item>
                )}
                <ListGroup.Item>
                        <Row>
                                <Col>
                                        <strong>Subtotal</strong>
                                </Col>
                                <Col>
                                        {order.itemsPrice.toLocaleString(
                                                'en-IN',
                                                {
                                                        maximumFractionDigits: 2,
                                                        style: 'currency',
                                                        currency: 'INR',
                                                }
                                        )}
                                </Col>
                        </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                        <Row>
                                <Col>
                                        <strong>Shipping</strong>
                                </Col>
                                <Col>
                                        {order.shippingPrice.toLocaleString(
                                                'en-IN',
                                                {
                                                        maximumFractionDigits: 2,
                                                        style: 'currency',
                                                        currency: 'INR',
                                                }
                                        )}
                                </Col>
                        </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                        <Row>
                                <Col>
                                        <strong>Tax</strong>
                                </Col>
                                <Col>
                                        {order.taxPrice.toLocaleString(
                                                'en-IN',
                                                {
                                                        maximumFractionDigits: 2,
                                                        style: 'currency',
                                                        currency: 'INR',
                                                }
                                        )}
                                </Col>
                        </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                        <Row>
                                <Col>
                                        <strong>Total</strong>
                                </Col>
                                <Col>
                                        {order.totalPrice.toLocaleString(
                                                'en-IN',
                                                {
                                                        maximumFractionDigits: 2,
                                                        style: 'currency',
                                                        currency: 'INR',
                                                }
                                        )}
                                </Col>
                        </Row>
                </ListGroup.Item>
                {/* show paypal button or the stripe checkout form */}
                {errors ? <Message variant="danger">{errors}</Message>:''}
                {!order.isPaid && (
                        <>
                                {order.paymentMethod ===
                                'Paypal' ? (
                                        <ListGroup.Item>
                                           {loadingPay && <Loading />}
                                                  <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,currency: "USD",intent: "capture",}} >
                                                           <PayPalButtons style= {{
                                                                                shape:  'pill',
                                                                                height: 40,
                                                                              //  label: 'pay',
                                                                        }}
                                                                 createOrder={(data, actions) => {
                                                                      return actions.order.create({
                                                                           purchase_units: [
                                                                                 {
                                                                                  amount: {
                                                                                      value: Number(
                                                                                            order.totalPrice /72
                                                                                                ).toFixed(2),
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                                    application_context: {
                                                                                        shipping_preference: 'NO_SHIPPING',
                                                                                      } //hiding shipping option from from
                                                                                });
                                                                            }}
                                                                        
                                                                        onApprove={(data, actions) => successPaymentHandler(data, actions)}
                                                                        onError={err => setErrors(err.message)}
                                                                />
                                                        </PayPalScriptProvider>
                                               
                                        </ListGroup.Item>
                                ) : (
                                        <ListGroup.Item>
                                                {loadingPay && <Loading />}
                                                <Elements
                                                        stripe={stripePromise}>
                                                        {/* price in paisa */}
                                                        <CheckoutForm
                                                                price={order.totalPrice * 100}
                                                                orderID={orderID} 
                                                                itemQWithIds = {itemQWithId}
                                                        />
                                                </Elements>
                                        </ListGroup.Item>
                                )}
                        </>
                )}
                {/* show this only to admins, after payment is done */}
                {userInfo &&
                        userInfo.isAdmin &&
                        order.isPaid &&
                        !order.isDelivered && (
                                <ListGroup.Item>
                                        {loadingDeliver && <Loading />}
                                        <div className='d-grid'>
                                                <Button
                                                        type='button'
                                                        variant='info'
                                                        size='lg'
                                                        onClick={
                                                                successDeliveryHandler
                                                        }>
                                                        Mark as Delivered
                                                </Button>
                                        </div>
                                </ListGroup.Item>
                )}
                </ListGroup>
                </Card>
        </Col>
        </>
        )}
   </Row>
</>
);
};

export default Orderproduct;

const Spannings =  styled(FormLabel)`
color: white;
font-size:13px;
background-color:green;
`
const Spannings2 =  styled(FormLabel)`
color: white;
font-size:13px;
background-color:red;
`

