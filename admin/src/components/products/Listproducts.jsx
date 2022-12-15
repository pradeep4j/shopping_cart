import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {listAllProducts} from '../../store/actions/productActions';
import { useDispatch,useSelector } from 'react-redux';
import Productrecords from './Productrecords';
import {TablePagination} from '@mui/material';

const Listproducts = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.listProduct);
  const { loading,productInfo } = listProduct;

  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  //const onDataPageChange = (event, page) => setDataPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 2));
    setPage(0);
  };

  useEffect(()=>{
   dispatch(listAllProducts());
   setPage(0); 
  },[dispatch,dataPage]);

  let listContent;
  let count=0;

    if(loading) {
        listContent = <tr><td colSpan='10'><h5>Loading...</h5></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        count=productInfo?.length;
        {productInfo && productInfo.length>0 ?
        (listContent = productInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Productrecords Productrecord={stud} />))) : (listContent = <tr><td colSpan='10'><h5>No record found</h5></td></tr>)}
    }
  return (
    <div className='container mt-5' >
        <div className='row'>
            <div className='col-md-11'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Products
                            <Link to={'/createproduct'} reloadDocument className="btn btn-primary btn-sm float-end">Add Product</Link>
                        </h4>
                    </div>
                    <div className='card-body' style={{width: 'auto'}}>
                        <table className='table table-bordered table-striped' >
                            <thead>
                                <tr><th>Image</th><th>Name</th>
                                    <th>Rate</th><th>Description</th><th>No of Item</th><th>Ratings</th><th>Purchased</th><th>Edit</th><th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContent}
                            </tbody>
                        </table>
                        <TablePagination
                                rowsPerPageOptions={[0]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Listproducts;

