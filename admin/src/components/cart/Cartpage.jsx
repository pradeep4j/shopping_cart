import React, { useState, useEffect } from 'react';
import {Link,useParams,useNavigate} from 'react-router-dom';
import { FormLabel,styled } from '@mui/material';
import {Row,Col,Image,ButtonGroup,ListGroup,Button,Card,} from 'react-bootstrap';
import {addItem, removeItem} from '../../store/actions/cartActions';
import { useDispatch,useSelector } from 'react-redux';

const CartPage = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartInfo } = cart;
	const [totalItems, setTotalItems] = useState(0);

	const productID = id;
	const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1; // fetch from the query 
	// remove item from cart
	const handleRemoveFromCart = (id) => {
		
		dispatch(removeItem(id));
	};
	useEffect(() => {   //after getting cartInfo set cart item in cart
		if (cartInfo) {
			setTotalItems(cartInfo.reduce((acc, item) => acc + item.qty, 0));
		}
	}, [cartInfo]);
	// store total items to localStorage state
	useEffect(() => {
		if (productID) {
			dispatch(addItem(productID, qty));
		}
	}, [dispatch, productID, qty]);
	// proceed to shipping address page, which is the next step in placing an order
	const handleCheckout = (e) => {
		navigate('/shipping');
	};

	return (
	<Row>
		<Col md={8}>
			<h1>Shopping Cart</h1>
			{cartInfo?.length === 0 ? (
				<Spannings>
					Your Cart is empty. <Tabs to='/'>&nbsp;&nbsp;&nbsp;Go Back.</Tabs>{' '}
				</Spannings>
			) : (
		<ListGroup variant='flush'>
			{cartInfo?.length >0 && cartInfo.map((item) => (
			    <ListGroup.Item key={item.product}>
				<Row
					style={{
						display: 'flex',
						alignItems: 'center',
					}}>
					<Col md={2}>
						<Image
							className='product-image'
							src={item.image.url}
							alt={item.name}
							fluid
							rounded
						/>
					</Col>
					<Col md={4}>
						<Link to={`/producttocart/${item._id}`}>
							{item.name}
						</Link>
					</Col>
					<Col
						md={3}
						className='d-none d-md-flex'
						style={{
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}>
						{item.rate.toLocaleString('en-IN', {
							maximumFractionDigits: 2,
							style: 'currency',
							currency: 'INR',
						})}

						<div>
							<i style={{ fontSize: '0.7em' }}
								className='fas fa-times'
							/>{' '}
							{item.qty}
						</div>
					</Col>
					{/* display this col only for larger screens */}
					<Col
						md={3}
						className='d-none d-md-flex'
						style={{
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<ButtonGroup aria-label='Addtocart'>
							<Button
								style={{
									outline: 'none',
									borderRight:
										'1px solid white',
								}}
								disabled={
									item.qty >=
									item.numberOfItem
								}
								onClick={() => {
									dispatch(
										addItem(
											item._id,
											Number(item.qty + 1)
										)
									);
								}}
								variant='primary'>
								<i className='fas fa-plus' />
							</Button>
							<Button
								style={{
									outline: 'none',
									borderLeft:
										'1px solid white',
								}}
								variant='primary'
								disabled={item.qty === 1}
								onClick={() => {
									dispatch(
										addItem(
											item._id,
											Number(item.qty - 1)
										)
									);
								}}>
								<i className='fas fa-minus' />
							</Button>
						</ButtonGroup>
						<Button
							type='button'
							onClick={() =>
								handleRemoveFromCart(
									item._id
								)
							}>
							<i className='fas fa-trash' />
						</Button>
					</Col>
					{/* display this col only on mobile screens */}
					<Col
						className='d-flex d-md-none mt-2'
						style={{
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<div
							className='d-flex'
							style={{
								fontSize: '1.2em',
								width: '50%',
							}}>
							{item.rate.toLocaleString(
								'en-IN',
								{
									maximumFractionDigits: 2,
									style: 'currency',
									currency: 'INR',
								}
							)}

							<div className='ms-1'>
								<i
									style={{
										fontSize: '0.7em',
									}}
									className='fas fa-times'
								/>{' '}
								{item.qty}
							</div>
						</div>

						<div
							className='d-flex'
							style={{
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '50%',
							}}>
							<Button
								type='button'
								onClick={() =>
									handleRemoveFromCart(
										item._id
									)
								}>
								<i className='fas fa-trash' />
							</Button>
							<Button
								style={{
									outline: 'none',
									borderRight:
										'1px solid white',
								}}
								disabled={
									item.qty >=
									item.numberOfItem
								}
								onClick={() => {
									dispatch(
										addItem(
											item._id,
											Number(item.qty + 1)
										)
									);
								}}
								variant='primary'>
								<i className='fas fa-plus' />
							</Button>
							<Button
								style={{
									outline: 'none',
									borderLeft:
										'1px solid white',
								}}
								variant='primary'
								disabled={item.qty === 1}
								onClick={() => {
									dispatch(
										addItem(
											item._id,
											Number(item.qty - 1)
										)
									);
								}}>
								<i className='fas fa-minus' />
							</Button>
						</div>
					</Col>
				</Row>
			    </ListGroup.Item>
			))}
			</ListGroup>
			)}
		</Col>
		<Col md={4} className='mt-3'>
			<ListGroup>
				<Card variant='flush'>
					<ListGroup.Item>
						<h2 className='text-center'>
							Subtotal ({totalItems}) Item
							{totalItems > 1 && 's'}
						</h2>
						<strong>
							{cartInfo && cartInfo
								.reduce(
									(acc, item) =>
										acc + item.qty * item.rate,
									0
								)
								.toLocaleString('en-IN', {
									maximumFractionDigits: 2,
									style: 'currency',
									currency: 'INR',
								})}
						</strong>
					</ListGroup.Item>
					<ListGroup.Item>
						<div className='d-grid'>
							<Button
								type='button'
								size='lg'
								disabled={!cartInfo?.length}
								onClick={handleCheckout}>
								Proceed to checkout
							</Button>
						</div>
					</ListGroup.Item>
				</Card>
			</ListGroup>
		</Col>
	</Row>
	);
};

export default CartPage;
const Spannings =  styled(FormLabel)`
color: white;
font-size:18px;
background-color:red;
`
const Tabs = styled(Link)`
font-size: 15px;
margin-right: 20px;
color:white;
text-decoration:none;
`