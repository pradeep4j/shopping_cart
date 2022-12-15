import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import {  FormGroup,FormControl,FormControlLabel,styled,Button,FormLabel,Radio,RadioGroup } from '@mui/material';  
import CheckoutStatus from './CheckoutStatus';
import { savePaymentMethod } from '../../store/actions/cartActions';
import { getUserDetails } from '../../store/actions/authActions';
import {useNavigate,NavLink,Link } from 'react-router-dom';

const PaymentPage = () => {
	const dispatch = useDispatch();
        const navigate = useNavigate(); 
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card(stripe)'); // default option is the stripe one, but users might not understand 'stripe'
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	// fetch user details
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		userInfo? dispatch(getUserDetails(userInfo._id)): '';
	}, [userInfo, dispatch]);

	// if shipping address is empty, redirect
	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e) => {
               // alert(paymentMethod);return;
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<Container>
			{/* three steps are done in the checkout process */}
			<CheckoutStatus step1 step2 step3 />
                        <h1>Payment Method</h1>
                        <FormControl  className="fieldset">
                    <FormLabel >Payment Method</FormLabel>
                        <RadioGroup
                                row
                                name="paymentMethod" 
				value={paymentMethod}
                                defaultValue="Credit/Debit Card(stripe)"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                        /* error={formik.touched.gender && Boolean(formik.errors.gender)} 
                                helperText={formik.touched.gender && formik.errors.gender*}*/>
                                <FormControlLabel 
                                        value="Credit/Debit Card(stripe)"
                                        control={<Radio />} 
                                        label="Credit/Debit Card(stripe)" 
                                        />
                                <FormControlLabel 
                                        value="Paypal"
                                        control={<Radio />} 
                                        label="Paypal" 
                                        />
                        </RadioGroup>
                 </FormControl> 
                        
			<FormControl>
				<Buttons variant="contained" type="submit" id="submitting" onClick={(e) => handleSubmit()}>Continue</Buttons>
			</FormControl>	
				
		</Container>
	);
};

export default PaymentPage;
const Container = styled(FormGroup)`
width: 40%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Spanning =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 .8rem;
`
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 80%;
`

