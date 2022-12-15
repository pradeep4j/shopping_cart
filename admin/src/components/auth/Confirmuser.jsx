/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert,Stack } from '@mui/material';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../layout/Loading';
import Message from '../Message';
import { confirmUsers } from '../../store/actions/authActions';

const Confirmuser = () => {
        const {token} = useParams();
	const dispatch = useDispatch();
        const navigate = useNavigate();
	const userConfirm = useSelector((state) => state.userConfirm); // get the userInfo to check if user is confirmed or not
	const { loading, error, isConfirmed } = userConfirm;
//alert(JSON.stringify(isConfirmed));return;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		// confirm user once the email token is available
		dispatch(confirmUsers(token, isLoggedIn));
	}, [dispatch,  isLoggedIn]);
       // alert(isLoggedIn)
	if (loading && (!isConfirmed )) {
		return <Loading />;
	
	} 
	else {
		// set a variable in local storage to fill email aftrer redirecting to login page after email confirmation
		//localStorage.setItem('fillEmailOnLoginPage', 'true');
		return (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="info">
                                {isLoggedIn
							? 'Your account has been successfully verified! Go on and shop for the best deals of the day!'
							: `Your account has been successfully verified! Please
						login and start exploring the best deals on all your
						favorite products.`}
                                </Alert>
                                {!setIsLoggedIn ? <Link to='/login'>Login</Link> : null}
                        </Stack>
		);
	}
};

export default Confirmuser;
