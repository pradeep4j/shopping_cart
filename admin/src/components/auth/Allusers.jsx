import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {usersAll,userSearchs} from '../../store/actions/authActions';
import { useDispatch,useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import Allusersrecord from './Allusersrecord';
import { FormLabel,TablePagination,styled} from '@mui/material';
import {getUser} from '../../utils/localStorage';
import { Table, Row, Col } from 'react-bootstrap';
import Loading from '../layout/Loading';

const Allusers = () => {
  const dispatch = useDispatch();
  const [searchNav,setSearch] = useState('');
  const [loggedUserId,setLoggedUserId] = useState('');
  const userAll = useSelector((state) => state.userAll);
  const { loading,error,userInfo } = userAll;
  const userSearch = useSelector((state) => state.userSearch);
  let {userInfoBySearch} = userSearch;
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  let [users,setUsers] = useState('');
  //const onDataPageChange = (event, page) => setDataPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 2));
    setPage(0);
  };

  const usersSearch = () => {
    setUsers('');
    const bodyNav = {
       searchValue: searchNav 
    }
     dispatch(userSearchs(bodyNav,loggedUserId));
  }
  const clearSearch = (e) => {
    e.preventDefault();
    document.getElementById('search').value='';
    userInfoBySearch='';
    setSearch('');
    setUsers(userInfo);
  }
  useEffect(()=>{
    const loggedUser = getUser();
    setLoggedUserId(loggedUser._id)
    dispatch(usersAll(loggedUser._id));
    setPage(0); 
  },[dispatch,dataPage]);

  let listContent;
  let count=0;

    if(loading) {
        listContent = <tr><td colSpan='11'><h5>Loading...</h5></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else if(userInfo && !userInfoBySearch){
        count=userInfo?.length;
        {userInfo && userInfo.length>0 ?
        (listContent = userInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Allusersrecord Allusersrecord={stud} />))) : (listContent = <tr><td colSpan='7'><h5>No record found</h5></td></tr>)}
    }
    else if(userInfoBySearch && !users){
        count=userInfoBySearch?.length; 
        {userInfoBySearch && userInfoBySearch?.length>0 ?
            (listContent = userInfoBySearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Allusersrecord Allusersrecord={stud} />))) : (listContent = <tr><td colSpan='11'><h5>No record found</h5></td></tr>)}
    }
    else if(users){
        count=users?.length; 
        {users && users?.length>0 ?
            (listContent = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Allusersrecord Allusersrecord={stud} />))) : (listContent = <tr><td colSpan='11'><h5>No record found</h5></td></tr>)}
    }
  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <center><h4>All Users ({`${count || 0}`})</h4></center>
        </Col>
    </Row>
    {loading ? (
                <Loading />
        ) : error ? (
                <Spanning dismissible variant='danger' duration={10}>
                        {error}
                </Spanning>
        ) : 
        (
            
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Users Data
                            <Link to={'/sign-up'} className="btn btn-primary btn-sm float-end">Add User</Link>
                        </h4>
                    </div>
                    <div  >
                        <input
                                id="search"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                style={{marginLeft:'18px',marginTop:'5px'}}
                                onChange={(e)=>setSearch(e.target.value)}
                            /><SearchIcon onClick={usersSearch} />
                        <Link onClick={(e) => clearSearch(e)} style={{textDecoration:'none',color:'black'}}>Clear</Link>
                    </div>
                    <Table
                        striped
                        bordered
                        responsive
                        className='table-sm text-center'>
                            <thead className='fonts'>
                                <tr><th >Image</th><th>Name</th><th>Occupation</th>
                                    <th>Email</th><th>Phone</th><th>Age</th><th>Gender</th><th>Admin</th><th>Edit</th><th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContent}
                            </tbody>
                    </Table>
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
       )
    }
    </>   
    )
};

export default Allusers;
const Spanning =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 .8rem;
`
