import React from 'react';
import { Typography,FormGroup,styled} from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../hide.css';

const Container = styled(FormGroup)`
width: 40%;
color: blue;
backgroundImage: url("../landing.jpg");
margin: 18% auto 0 auto;
& > div {
    margin-top:300px;
}
`
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 48,
    padding: '0 30px'
  },
});
const Welcome = () => {
  //const classes = useStyles(); //one of the way to use mui/styles as className
  return (
      <Container /*className="classes.root"*/>
              <Typography variant="h5">Welcome to my MERN with Redux Page</Typography>
      </Container>
  )
}

export default Welcome;