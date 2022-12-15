import React from 'react';
//import {useDispatch} from 'react-redux';
//import Swal from 'sweetalert2';
import '../../hide.css';

//import {Link} from 'react-router-dom';

const Productrecords = ({Productrecord}) => {
      //const dispatch = useDispatch();
      const deleteproduct = (e,id) => {
            if (window.confirm("Are you sure?")) {
              let targetSet = e.currentTarget;
              targetSet.innerText='Deleting';
            //   dispatch(deleteCustomers(e,id));
            }
      }      
    return (
      <tr key={Productrecord._id}>
          <td><img src={Productrecord.image.url} className="bag-quantity1" alt="alt"/></td>
          <td>{Productrecord.name}</td>
          <td>{Productrecord.rate}</td>
          <td>{Productrecord.description}</td>
          <td>{Productrecord.numberOfItem}</td>
          <td>{Productrecord.ratings}</td>
          <td>{(Productrecord.isPurchased===true)?'Available':'Not in Stock'}</td>          
          <td><a style={{color:'white',textDecoration: 'none',pointerEvents: 'none'}} className='btn btn-success btn-sm' href={`/productedit/${Productrecord._id}`} >Edit</a></td>
          <td>
            <button disabled className='btn btn-danger btn-sm' onClick={(e) => deleteproduct(e,Productrecord._id)} >Delete</button>
          </td>    
      </tr>
    )
}
export default Productrecords;