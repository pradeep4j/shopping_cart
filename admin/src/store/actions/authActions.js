import { login,logout,addUser,updateUsersProfileById,editUserFromAdminById,allUsers,usersProfileByid,confirmUser,searchUsers,deleteUser } from "../../routes/userRoutes";
import {setUser,removeUser} from '../../utils/localStorage';
import { toast } from 'react-toastify';
import {
        USER_LOGIN_FAIL,
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGOUT,
        USER_REGISTER_FAIL,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_UPDATE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        EDIT_USER_FROM_ADMIN_FAIL,
        EDIT_USER_FROM_ADMIN_REQUEST,
        EDIT_USER_FROM_ADMIN_SUCCESS,
        USER_ALL_FAIL,
        USER_ALL_REQUEST,
        USER_ALL_SUCCESS,
        USER_GETUSERBYSEARCH_REQUEST,
        USER_GETUSERBYSEARCH_SUCCESS,
        USER_GETUSERBYSEARCH_FAIL,
        USER_DELETE_FAIL,
        USER_DELETE_REQUEST,
        USER_DELETE_SUCCESS,
        USER_GET_DETAILS_REQUEST,    
        USER_GET_DETAILS_SUCCESS, 
        USER_GET_DETAILS_FAIL,      
        USER_CONFIRM_REQUEST,
        USER_CONFIRM_SUCCESS,
        USER_CONFIRM_FAIL
      } from "../actionTypes/authConstants";

export const loginUser = (postbody) => async (dispatch) => {
        //login dispatch
        dispatch({ type: USER_LOGIN_REQUEST });

                await login(postbody).then(response=>{
                dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });        
                if(response.status===201 && (response.data!==400 && response.data!==404 ))
                {
                        setUser(response.data);
                        toast.success('User is Logged in Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                /*swal({
                        title: "Successful!",
                        text: 'User Addes Successfully !',
                        icon: "success",
                        button: "OK!",
                });*/
                }
                else if(response.data===404)
                {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                'User is not registered with us!' });                        
                        toast.error('User is not registered with us!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });       
                document.getElementById("submitting").innerText = "Login";
                document.getElementById("submitting").disabled  = false;
                }
                else if(response.data===400)
                {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                'Entered Username/Password is wrong!' });
                        toast.error('Entered Username/Password is wrong!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        }); 
                document.getElementById("submitting").innerText = "Login";
                document.getElementById("submitting").disabled  = false;  
                }
                else
                {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                response.data });
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        }); 
                document.getElementById("submitting").innerText = "Login";
                document.getElementById("submitting").disabled  = false;                                           
                }
                }).catch(error =>{
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                error.message });

                        toast.error(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        }); 
                document.getElementById("submitting").innerText = "Login";
                document.getElementById("submitting").disabled  = false;                                            
                });  
     
};
export const registerUser = (postBody) => async (dispatch) => {

        dispatch({ type: USER_REGISTER_REQUEST });
                await addUser(postBody).then(response => {
                dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
                if(response.status===201 && response.data!==409)
                {
                        toast.success('User Added Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else if(response.data===409)
                { 
                        dispatch({
                                type: USER_REGISTER_FAIL,
                                payload:
                                "Email is already registered with us!" });
                        toast.error('Email is already registered with us!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });                  
                document.getElementById("submitting").innerText = "Add User";
                document.getElementById("submitting").disabled  = false;
                }
                else {
                        dispatch({
                                type: USER_REGISTER_FAIL,
                                payload:
                                response.data });
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });                    
                }
                document.getElementById("submitting").innerText = "Add User";
                document.getElementById("submitting").disabled  = false;
            }).catch((error) => {
                        dispatch({
                                type: USER_REGISTER_FAIL,
                                payload:
                                error.message });
                        toast.error(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });                      
                document.getElementById("submitting").innerText = "Add User";
                document.getElementById("submitting").disabled  = false;                                               
            });
};
export const updateUser = (postBody,id,loggedUserId) => async (dispatch) => {

                dispatch({ type: USER_UPDATE_REQUEST });

                await updateUsersProfileById(postBody,id).then(response => {
                if(id===loggedUserId){
                  (response.data).profile = true;      
                }
                else{
                   (response.data).profile = false;  
                }
                dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data });
                dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });            
                if(response.status===201)
                {
                /*swal({
                        title: "Successful!",
                        text: 'User Addes Successfully !',
                        icon: "success",
                        button: "OK!",
                });*/   if(id===loggedUserId){
                                setUser(response.data);
                                toast.success('Users Profile is Updated Successfully!', {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });
                        }
                        else {
                                toast.success(`User "${(response.data).name}" is Updated Successfully!`, {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });
                        }
                }
                else {
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                document.getElementById("submitting").innerText = "Update Profile";
                document.getElementById("submitting").disabled  = false;                                              
                }
    }).catch((error) => {
                        dispatch({
                                type: USER_UPDATE_FAIL,
                                payload:
                                error.message });
                        toast.error(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                document.getElementById("submitting").innerText = "Update Profile";
                document.getElementById("submitting").disabled  = false;                                              
    });
};
export const editUserFromAdminByIds = (postBody,id) => async (dispatch) => {

        dispatch({ type: EDIT_USER_FROM_ADMIN_REQUEST });

        await editUserFromAdminById(postBody,id).then(response => {

        dispatch({ type:EDIT_USER_FROM_ADMIN_SUCCESS, payload: response.data });
       // dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });            
        if(response.status===201)
        {
                toast.success(`User "${(response.data).name}" is Updated Successfully!`, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        }
        else {
                toast.error(response.data, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        document.getElementById("submitting").innerText = "Update User";
        document.getElementById("submitting").disabled  = false;                                              
        }
}).catch((error) => {
                dispatch({
                        type: EDIT_USER_FROM_ADMIN_FAIL,
                        payload:
                        error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        document.getElementById("submitting").innerText = "Update User";
        document.getElementById("submitting").disabled  = false;                                              
});
};
export const logoutUser = () => async (dispatch) => {
                dispatch({ type: USER_LOGOUT }); 
                await logout().then(response => {
                if(response.status===201) {
                        removeUser();
                        toast.success('User Logged Out Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else if(response.status===208){
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }       
                }).catch(error =>{
                        toast.error(error.maessage, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                });      
}
export const usersAll = (loggedUserId) => async (dispatch) => {
        dispatch({ type: USER_ALL_REQUEST }); 
        await allUsers(loggedUserId).then(response => {
                dispatch({ type: USER_ALL_SUCCESS,payload: response.data}); 
        if(response.status===201) {
               /* toast.success('User Logged Out Successfully!', {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });*/
        }
        else {
                dispatch({ type: USER_ALL_FAIL,payload: response.message}); 
                toast.error(response.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        }       
        }).catch(error =>{
                dispatch({ type: USER_ALL_FAIL,payload: error.maessage}); 
                toast.error(error.maessage, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });      
}
export const userSearchs = (data,loggedUserId) => async(dispatch) =>
{       
        dispatch({type:USER_GETUSERBYSEARCH_REQUEST});
        await searchUsers(data,loggedUserId).then(response => {
                dispatch({type:USER_GETUSERBYSEARCH_SUCCESS,payload:response.data});
        if(response.status===201 )
        {
                toast.success(response.data, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        }
        else {
                dispatch({type:USER_GETUSERBYSEARCH_FAIL,payload:`OOps!...No Record Found on this ID ${loggedUserId} !!`});
                toast.error(`OOps!...No Record Found on this ID ${loggedUserId} !!`, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        }
 
        }).catch(error => {
                dispatch({type:USER_GETUSERBYSEARCH_FAIL,payload:error.message});
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}
export const deleteUsers = (e,id) => async(dispatch) =>
{       
        dispatch({type:USER_DELETE_REQUEST});
        let targetSet = e.currentTarget;
       
        await deleteUser(id).then(response => {
                dispatch({type:USER_DELETE_SUCCESS,payload:response.data});
        if((response.status===201 || response.status===200) && (response.data!==403 && response.data!==401 && response.data!==404))
        {
                targetSet.innerText='Delete';
                e.target.closest("tr").remove();
                toast.success(response.data, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        }
        }).catch(error => {
                dispatch({type:USER_DELETE_FAIL,payload:error.message});
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
} 
export const getUserDetails = (id) => async(dispatch) =>
{       
        dispatch({type:USER_GET_DETAILS_REQUEST});
 
        await usersProfileByid(id).then(response => {
               // alert(JSON.stringify(response.data));
                dispatch({type:USER_GET_DETAILS_SUCCESS,payload:response.data});
                if(response.status===201)
                {
                /* toast.success('User Updated Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });*/
                }
                }).catch(error => {
                        dispatch({type:USER_GET_DETAILS_FAIL,payload:error.message});
                        toast.error(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                });
} 
// take the email token sent from the mail, and confirm the account once the link is clicked
export const confirmUsers = (emailToken, alreadyLoggedIn = false) => async (dispatch, getState) => {

			dispatch({ type: USER_CONFIRM_REQUEST });
			await confirmUser(`${emailToken}`).then(response => {

			// remove variable meant to prompt the user for email verification
			localStorage.removeItem('promptEmailVerfication');
			dispatch({ type: USER_CONFIRM_SUCCESS, payload: true });
			if (alreadyLoggedIn) {
				dispatch({ type: USER_CONFIRM_SUCCESS, payload: response.data });
				localStorage.setItem('userInfo', JSON.stringify(response.data));
			}
		}).catch(error => {
			dispatch({type: USER_CONFIRM_FAIL,
                                        payload:error.message
				});
                        toast.error(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
		});
}
