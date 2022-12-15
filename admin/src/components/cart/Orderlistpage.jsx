import React, { useEffect,useState } from 'react';
import { FormGroup,FormLabel,TablePagination,styled} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import Loading from '../layout/Loading';
import { listAllOrders } from '../../store/actions/orderActions';
import getDateString from '../../utils/getDateString';
import {useNavigate,useParams} from 'react-router-dom';


const ProductListPage = () => {
        const {pageNumber} = useParams();
        const navigate = useNavigate();
	//const pageNumber = match.params.pageNumber || 1; // to fetch various pages of orders
	const dispatch = useDispatch();
        const [dataPage, setDataPage] = useState(0);
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(2);
	const orderListAll = useSelector((state) => state.orderListAll); // to avoid blank screen display
	const { loading, orders, error} = orderListAll;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

        const count=orders?.length;
        const handleChangePage = (event, newPage) => setPage(newPage);

        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 2));
          setPage(0);
        };

	// get all orders by pagenumber
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listAllOrders());
		else navigate('/login');
                setPage(0); 
	}, [dispatch,  userInfo, dataPage]);

	return (
        <>
        <Row className='align-items-center'>
                <Col>
                <center><h4>All Orders ({`${count || 0}`})</h4></center>
                </Col>
        </Row>
        {loading ? (
                <Loading />
        ) : error ? (
                <Spanning dismissible variant='danger' duration={10}>
                        {error}
                </Spanning>
        ) : (
                <Table
                striped
                bordered
                responsive
                className='table-sm text-center'>
                                    <thead className='fonts' >
                                        <tr><th>ID</th><th>User</th><th>Total</th>
                                            <th>Date</th><th>Paid</th><th>Delievred</th><th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
                                        return (
                                                <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{order.user && order.user.name}</td>
                                                        <td>
                                                                {order.totalPrice.toLocaleString(
                                                                        'en-IN',
                                                                        {
                                                                                maximumFractionDigits: 2,
                                                                                style: 'currency',
                                                                                currency: 'INR',
                                                                        }
                                                                )}
                                                        </td>
                                                        <td>
                                                                {getDateString(order.createdAt)}
                                                        </td>
                                                        <td>
                                                                {order.isPaid ? (
                                                                        getDateString(order.paidAt)
                                                                ) : (
                                                                        <i
                                                                                className='fas fa-times'
                                                                                style={{
                                                                                        color: 'red',
                                                                                }}
                                                                        />
                                                                )}
                                                        </td>
                                                        <td>
                                                                {order.isDelivered ? (
                                                                        getDateString(order.deliveredAt)
                                                                ) : (
                                                                        <i
                                                                                className='fas fa-times'
                                                                                style={{
                                                                                        color: 'red',
                                                                                }}
                                                                        />
                                                                )}
                                                        </td>
                                                        <td
                                                                style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-around',
                                                                }}>
                                                                <a style={{color:'white',textDecoration: 'none'}} className='btn btn-success btn-sm' href={`/order/${order._id}`}>
                                                                        
                                                                                View Details
                                                                       
                                                                </a>
                                                        </td>
                                                </tr>
                                        );
                                })}
                        </tbody>
                                
                                
                </Table>)}
                <TablePagination
                        rowsPerPageOptions={[0]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                />
        
        
        </>
	);
};

export default ProductListPage;
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