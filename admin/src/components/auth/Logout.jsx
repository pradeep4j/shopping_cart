import React from 'react';
import { Typography,FormGroup,styled } from '@mui/material';

//import swal from 'sweetalert';

const Container = styled(FormGroup)`
width: 30%;
margin: 18% auto 0 auto;
& > div {
    margin-top:10px;
}
`
 
const Logout = () => {
  return (
    <Container>
            <Typography variant="h5">User Logged out successfully</Typography>
            {/* <Form metod="post" onSubmit={(e) =>{ onSubmit(e)}}> */}
    </Container>
  
  )
}

export default Logout;