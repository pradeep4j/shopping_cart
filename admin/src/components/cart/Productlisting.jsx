import React, {useEffect,useState} from 'react';
import Loading from '../layout/Loading';
import {TablePagination,FormLabel,styled} from '@mui/material';
import Productrecords from './Productrecords';
import { Row, Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {productListings} from '../../store/actions/cartActions';
import Message from '../Message';

const Productlisting = () => {

  const dispatch = useDispatch();
  const productListingsCart = useSelector(state=>state.productListingsCart);
  const {loading,cartInfo} = productListingsCart;
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [promptVerfication, setPromptVerification] = useState(false);
  //const onDataPageChange = (event, page) => setDataPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 2));
    setPage(0);
  };

  useEffect(()=>{
   dispatch(productListings());
   setPage(0); 
  },[dataPage,dispatch]);
  useEffect(() => {
    localStorage.getItem('userInfo'); 
		setPromptVerification(
			localStorage.getItem('promptEmailVerfication') === 'true'
				? true
				: false
		);
	}, []);

  let count=cartInfo?.length;
  
  return (
    <div className='container mt-5' >
      {promptVerfication ? (
				<Message variant='info' duration={20}>
					Account Created! Please check your email to verify your
					account and start shopping
				</Message>
			) : null}
          <Row>{!loading && cartInfo?.length>0
							? cartInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,i) => {
                  return (
                        <Col
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3} key={i}>
                            <Productrecords Productrecord={product} />
                        </Col>
                        );
                      }):<Loading />}
          </Row>                          
                     {count > 0 ?   
                            <TablePagination
                                rowsPerPageOptions={[0]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> : ''}
                 
    </div>
  )
}

export default Productlisting;
const Spanning =  styled(FormLabel)`
color: white;
font-size:12px;
font-weight:bold;
background-color:red;
`
