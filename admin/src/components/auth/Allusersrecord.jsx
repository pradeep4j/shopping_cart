import React from 'react';
import {deleteUsers} from '../../store/actions/authActions';
import {useDispatch,useSelector} from 'react-redux';
import ImageMagnifier from '../cart/ImageMagnifier'; // to magnify image on hover
import Swal from 'sweetalert2';
import '../../hide.css';

import {Link} from 'react-router-dom';

const Allusersrecord = ({Allusersrecord}) => {
      const dispatch = useDispatch();
      const deleteuser = (e,id) => {
            if (window.confirm("Are you sure?")) {
              let targetSet = e.currentTarget;
              targetSet.innerText='Deleting';
               dispatch(deleteUsers(e,id));
            }
      }      
    return (
      <tr key={Allusersrecord._id}>
          <td ><center><ImageMagnifier src={Allusersrecord.image.url} width="50px" height="50px" /></center></td>
          <td>{Allusersrecord.name}</td>
          <td>{Allusersrecord.occupation}</td>
          <td>{Allusersrecord.email}</td>
          <td>{Allusersrecord.phone}</td>
          <td>{Allusersrecord.age}</td>
          <td>{Allusersrecord.gender}</td>
          <td>{Allusersrecord.isAdmin ===true ? 'Yes': 'No'}</td>          
          <td><a style={{color:'white',textDecoration: 'none'}} className='btn btn-success btn-sm' href={`/userEditFromAdminId/${Allusersrecord._id}`} >Edit</a></td>
          <td>
            {Allusersrecord.isAdmin ?
              <><button className='btn btn-danger btn-sm' onClick={(e) => deleteuser(e,Allusersrecord._id)}>Delete</button></>  : <><button className='btn btn-danger btn-sm' onClick={(e) => deleteuser(e,Allusersrecord._id)} >Delete</button></>  }
          </td>    
      </tr>
    )
}
export default Allusersrecord;