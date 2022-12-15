import React, {useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import ImageMagnifier from './ImageMagnifier'; // to magnify image on hover
import Loading from '../layout/Loading';
//import Message from './Message';
import Rating from '@mui/material/Rating';
import { Select,MenuItem } from '@mui/material';
import {productByIdToCart} from '../../store/actions/cartActions';
import {useDispatch,useSelector} from 'react-redux';
import {setProduct} from '../../utils/localStorage';        

//import {Grid ,Col, styled,Typography,Card,ListGroup,Form,Button } from '@mui/material';

import { Row,Col,Card,Button,ListGroup,Form,FloatingLabel, } from 'react-bootstrap';

const Producttocarts = () => {
  const {id} = useParams();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo} = userLogin;
  const productToCart = useSelector(state=>state.productToCart);
  const {loading, error, cartInfo} = productToCart;
  //alert(JSON.stringify(cartInfo));//return;
  const [quantity, setQuantity] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [value, setValue] = useState(''); // bool to check if the user has ordered this product
  const [showReviewForm, setShowReviewForm] = useState(false); // bool to decide whether to show the review form or not

  const [spinner,setSpinner] = useState(false);
  const handleAddToCart = (e) => {
        setProduct(cartInfo);
        navigate(`/cart/${id}?qty=${quantity}`);
  };

  const handleReviewSubmit = (e) => {
       /* dispatch(
                createProductReview(match.params.id, {
                        ratings,
                        review,
                })
        );*/
  };
  
  useEffect(()=>{
        dispatch(productByIdToCart(id));
  },[]); 
     
  return (

        <div className='container mt-5' >
        {loading && <Loading />}
          <Row>
             <Col md={4}>
                    <ImageMagnifier
                            src={cartInfo && cartInfo[0].image.url}
                            alt={cartInfo && cartInfo[0].name}
                            title={cartInfo && cartInfo[0].name}
                    />
            </Col> 
            <Col md={3}>
                     <ListGroup variant='flush'>
                            <ListGroup.Item>
                                    <h3>{cartInfo && cartInfo[0].name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    {cartInfo && cartInfo[0].ratings && (
                                            <Rating
                                            value={cartInfo && cartInfo[0].ratings}
                                            onChange={(event, newValue) => {
                                            setValue(newValue);}}
                                            />
                                    )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <strong>Price: </strong>
                                    {cartInfo && cartInfo[0].rate &&
                                            cartInfo[0].rate.toLocaleString('en-IN', {
                                                    maximumFractionDigits: 2,
                                                    style: 'currency',
                                                    currency: 'INR',
                                            })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <strong>Description:</strong>{' '}
                                    {cartInfo && cartInfo[0].description}
                            </ListGroup.Item>
                    </ListGroup> 
            </Col>
            <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                <Row>
                                        <Col>
                                                <strong>Price: </strong>
                                        </Col>
                                        <Col>
                                                {cartInfo && cartInfo[0].rate &&
                                                        cartInfo[0].rate.toLocaleString(
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
                            </ListGroup>
                            <ListGroup variant='flush'>
                                   <ListGroup.Item>
                                        <Row>
                                                <Col>
                                                        <strong>Status: </strong>
                                                </Col>
                                                <Col>
                                                        {cartInfo && cartInfo[0].numberOfItem > 0
                                                                ? 'In Stock'
                                                                : 'Out of Stock'}
                                                </Col>
                                        </Row>
                                   </ListGroup.Item>
                                   {cartInfo && cartInfo[0].numberOfItem > 0 && (
                                        <ListGroup.Item>
                                        <Row>
                                                <Col>
                                                        <strong>Qty:</strong>
                                                </Col>
                                                <Col>   
                                                        <Select value={quantity} 
                                                                        onChange={(e) =>
                                                                                setQuantity(
                                                                                        e.target.value
                                                                                )
                                                                        } >
                                                                {[...Array(cartInfo && cartInfo[0].numberOfItem).keys(),
                                                                                                                                                                        ].map((i)=>(<MenuItem value={i+1}>{i+1}</MenuItem>))}        
    
                                                        </Select>       
                                                        
                                                </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                        <Row>
                                                <Button
                                                        onClick={handleAddToCart}
                                                        type='button'
                                                        className='btn-block btn-lg'
                                                        disabled={
                                                                cartInfo && cartInfo[0].numberOfItem <= 0
                                                        }>
                                                        Add To Cart
                                                </Button>
                                        </Row>
                                </ListGroup.Item>
                            </ListGroup>
                    </Card>
            </Col>
    </Row>
    
</div>
) 

}

export default Producttocarts;
