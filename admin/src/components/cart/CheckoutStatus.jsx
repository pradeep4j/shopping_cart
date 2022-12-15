import React from 'react';
import { Nav } from 'react-bootstrap';
import {styled} from '@mui/material';  
import { NavLink } from 'react-router-dom';
import '../../hide.css';

// there are 4 steps in the checkout process
// step 1 is logging in
// step 2 is shipping address input
// step 3 is selecting payment option
// step 4 is placing the order and seeing payment button
const CheckoutStatus = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className='status-bar'>
			<div className='status-checkpoint'>
				<div
					className='circle'
					style={
						step1 ? { background: '#2c3e50' } : { background: '' }
					}
				/>
				{step1 ? (
					<Tabs2 to="/login">Sign In</Tabs2>
					
				) : (
					<Tabs2 disabled>Sign In</Tabs2>
				)}
			</div>
			<div className='connection' />
			<div className='status-checkpoint'>
				<div
					className='circle'
					style={
						step1 && step2
							? { background: '#2c3e50' }
							: { background: '' }
					}
				/>
				{step2 ? (
					<Tabs2 to='/shipping'>
						Shipping
					</Tabs2>
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</div>
			<div className='connection' />

			<div className='status-checkpoint'>
				<div
					className='circle'
					style={
						step1 && step2 && step3
							? { background: '#2c3e50' }
							: { background: '' }
					}
				/>
				{step3 ? (
					<Tabs2 to='/payment'>
						Payment
					</Tabs2>
				) : (
					<Tabs2 disabled>Payment</Tabs2>
				)}
			</div>
			<div className='connection' />

			<div className='status-checkpoint'>
				<div
					className='circle'
					style={
						step1 && step2 && step3 && step4
							? { background: '#2c3e50' }
							: { background: '' }
					}
				/>
				{step4 ? (
					<Tabs2 to='/placeorder'>
						Place Order
					</Tabs2>
				) : (
					<Tabs2 disabled>Place Order</Tabs2>
				)}
			</div>
		</Nav>
	);
};

export default CheckoutStatus;
const Tabs2 = styled(NavLink)`
font-size: 13px;
margin-right: 20px;
color:#2c3e50;
text-decoration:none;
text-transform: capitalize;
`