import React,{useState} from 'react';
import '../../hide.css';
import {Paper} from '@mui/material';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Productrecords = ({Productrecord}) => {
   const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
   }));     
   const [value,setValue] = useState(true);
   return (
        <Grid container spacing={1}>
      <Grid xs={12}>
          <Item>
        
                <Link to={`/producttocart/${Productrecord._id}`}>
                        <img
                                loading='lazy'
                                src={Productrecord.image.url}
                                variant='top'
                                alt={Productrecord.name}
                        />
		</Link>
            
                <Link
                        to={`/producttocart/${Productrecord._id}`}
                        style={{ color: 'dimgray', textDecoration: 'none' }}>
                        <Card.Title >
                                {Productrecord.name}
                        </Card.Title>
                </Link>
                
                        {Productrecord && Productrecord.ratings && (
                                <Rating
                                        name="half-rating"
                                        precision={0.5}
                                        value={Productrecord.ratings/2}
                                        onChange={(event, newValue) => {
                                       // setValue(newValue);
                                }}/>
                        )}
                
                <p style={{color:'black',fontSize:'15px'}}>
                    <b>
                        {Productrecord.rate &&
                                Productrecord.rate.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR',
                                })}
                    </b>
                </p>
                <p style={{color:'black',fontSize:'15px'}}>
                    <b>
                        Quantity:
                    </b>
                        {Productrecord.numberOfItem &&
                                Productrecord.numberOfItem
                                }
                    
                </p>  
                <p style={{color:'black',fontSize:'15px'}}>            
                        <b>Availibility:</b>
                        {Productrecord.numberOfItem &&
                                (Productrecord.isPurchased===true)?'In Stock':'Not in Stock'
                                }
                </p>                           
             </Item>
             </Grid>
        </Grid>
    )
}
export default Productrecords;