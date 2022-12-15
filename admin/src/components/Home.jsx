import React,{useEffect,useState} from 'react';
import { Typography,FormGroup,styled,Divider } from '@mui/material';
import {getUser} from '../utils/localStorage';
import moment from 'moment';


const Container = styled(FormGroup)`
width: 40%;
color: blue;
margin: 15% 20% 0 auto;
& > div {
    margin-top:10px;
}
`
    
  const Home = () => {
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
   
    useEffect(() => {
    const savedUser = getUser();
    if(savedUser){
      setName(savedUser.name);
      setEmail(savedUser.email);
    };
    setInterval(() => {
      const date = new Date();
    }, 0);

   },[]); 
    
  return (

    <Container>
            <Typography variant="h5">Users DashBoard</Typography>
            <Divider variant="middle"/>
            <p>Name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p>Email: {email}</p>
            <p>Current Time: {moment().format("DD-MM-YYYY hh:mm:ss")}</p>
    </Container>
  
  )
}

export default Home;