import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLabel,styled } from '@mui/material';
import { Form, Button } from 'react-bootstrap';
import {stripeRequest} from '../../routes/orderRoutes'
import { payOrders } from '../../store/actions/orderActions';
import { savePaymentMethod } from '../../store/actions/cartActions';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // for stripe CC component
//import Message from '../components/Message';

const CheckoutForm = ({price,orderID,itemQWithIds}) => {
	const navigate = useNavigate();
	const [error, setError] = useState(''); // from the stripe component itself
	const dispatch = useDispatch();
	const [clientSecret, setClientSecret] = useState(''); // from the payment intent sent from server
	const stripe = useStripe();
	const elements = useElements();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// STEP 1: create a payment intent and getting the secret
	useEffect(() => {
		const getClientSecret = async () => {
			const postBody = { price, email: userInfo.email };
			await stripeRequest(postBody).then(response => {

			setClientSecret(response.data.clientSecret);
			});
		};

		if (userInfo && price) getClientSecret();
	}, [price, userInfo]);

	// STEP 2: make the payment after filling the form properly
	const makePayment = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make  sure to disable form submission until Stripe.js has loaded.
			return;
		}
		//alert(JSON.stringify(elements.getElement(CardElement)))
		if (clientSecret) {
			let payload = {};
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: userInfo.name,
						email: userInfo.email,
					},
				},
			}).then((result) => {
				if (result.paymentIntent && result.paymentIntent.status==='succeeded') {
					//alert(result.paymentIntent.status);return;
					//adding item quntity to payment details to update product quantity to product collection
					result.paymentIntent.itemQWithId=itemQWithIds;
					dispatch(savePaymentMethod('Stripe'));
					dispatch(
						payOrders(orderID, {
							...result.paymentIntent,
							paymentMode: 'stripe',
						})
					);
				} else {
					setError(result.error.message);
				}
			});
			
		} else {
			window.location.reload();
		}
	};

	// render a checkout form for filling details about credit or debit cards
	return (
		<Form id='payment-form' onSubmit={makePayment}>
			{error && (
				<Spannings dismissible variant='danger'>
					{error}
				</Spannings>
			)}
			<Form.Group
				style={{
					margin: '1em 0',
					fontSize: '1em',
				}}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
					id='card-element'
				/>
			</Form.Group>
			<div className='d-grid'>
				<Button disabled={!stripe} size='lg' type='submit'>
					Pay Now
				</Button>
			</div>
		</Form>
	);
};

export default CheckoutForm;
const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`
