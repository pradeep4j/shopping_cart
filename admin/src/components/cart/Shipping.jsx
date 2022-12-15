import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  FormGroup,FormControl,TextField,styled,Button,FormLabel } from '@mui/material';  
//import FormContainer from '../components/FormContainer';
import CheckoutStatus from './CheckoutStatus';
import { saveShippingAddress } from '../../store/actions/cartActions';
import { getUserDetails } from '../../store/actions/authActions';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

const Shipping = ({ history }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); 

	const cart = useSelector((state) => state.cart);
	const { cartInfo, shippingAddress } = cart;
	//alert(JSON.stringify(shippingAddress));
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	const initialValues = {
		address: '',
		city:'',
		postalcode:'',
		country:''
	}
	let savedValues = '';
		if(shippingAddress) {
		   savedValues = {
		      address: shippingAddress.address,
		      city:shippingAddress.city,
		      postalcode:shippingAddress.postalcode,
		      country:shippingAddress.country
		   }
		}
//alert(JSON.stringify(savedValues));
	const schema = Yup.object({
		address: Yup.string()
			    .required('Address isRequired'),
		city: Yup.string()
			 .required('City is Rquired!'),
		postalcode: Yup.string()
			 .required('Postal code is Rquired!'),
		country: Yup.string()
		         .required('Country is Rquired!'),			 
			 
	})
	const formik = useFormik({
		initialValues: (savedValues || initialValues),
		validationSchema: schema,
		enableReinitialize:true,  //this variable must be true if data comes from API
		onSubmit : (values,{resetForm}) => {
			shippingSubmit(values,resetForm);
		}
	})
	// fetch user details from the redux store
	useEffect(() => 
	{	// eslint-disable-next-line no-unused-expressions
  	   userInfo?dispatch(getUserDetails(userInfo._id)): '';
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (!(cartInfo.length && userInfo)) {
			navigate('/');
		}
	}, [cartInfo, userInfo,navigate]);

	// save shipping address and move to payment screen
	const shippingSubmit = (vals) => {

		const postBody = {
			address : vals.address,
			city : vals.city,
			postalcode : vals.postalcode,
			country: vals.country
		}
		dispatch(
			saveShippingAddress(postBody));
		navigate('/payment');
	};

	return (
		<Container>
			<CheckoutStatus step1 step2 />
			<h1>Shipping Address</h1>
			<FormControl>
				<TextField value={formik.values.address} 
				label="Address" 
				name="address" 
				onChange={formik.handleChange} required 
				error={formik.touched.address && Boolean(formik.errors.address)}
				helperText={formik.touched.address && formik.errors.address}
				/>
                	</FormControl>
			<FormControl>
				<TextField value={formik.values.city} 
				label="City" 
				name="city" 
				onChange={formik.handleChange} required 
				error={formik.touched.city && Boolean(formik.errors.city)}
				helperText={formik.touched.city && formik.errors.city}
				/>
                	</FormControl>
			<FormControl>
				<TextField value={formik.values.postalcode} 
				label="Postal Code" 
				name="postalcode" 
				onChange={formik.handleChange} required 
				error={formik.touched.postalcode && Boolean(formik.errors.postalcode)}
				helperText={formik.touched.postalcode && formik.errors.postalcode}
				/>
                	</FormControl>
			<FormControl>
				<TextField value={formik.values.country} 
				label="Country" 
				name="country" 
				onChange={formik.handleChange} required 
				error={formik.touched.country && Boolean(formik.errors.country)}
				helperText={formik.touched.country && formik.errors.country}
				/>
                	</FormControl>
			<FormControl>
				<Buttons variant="contained" type="submit" id="submitting" onClick={(e) => formik.handleSubmit()}>Continue</Buttons>
			</FormControl>	
	</Container>
	);
};

export default Shipping;
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

