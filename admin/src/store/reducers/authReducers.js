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
        USER_ALL_FAIL,
        USER_ALL_REQUEST,
        USER_ALL_SUCCESS,  
        EDIT_USER_FROM_ADMIN_FAIL,
        EDIT_USER_FROM_ADMIN_REQUEST,
        EDIT_USER_FROM_ADMIN_SUCCESS,        
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

export const userLoginReducer = (state= {}, action) => {
        switch(action.type) {
                case USER_LOGIN_REQUEST: return { loading:true };
                case USER_LOGIN_SUCCESS: return { loading:false, userInfo: action.payload };
                case USER_LOGIN_FAIL: return { loading:false, error: action.payload };
                case USER_LOGOUT: return {};
                default: return state;
        }
}
export const userRegisterReducer = (state= {}, action) => {
        switch(action.type) {
                case USER_REGISTER_REQUEST: return { loading:true };
                case USER_REGISTER_SUCCESS: return { loading:false, userInfo: action.payload };
                case USER_REGISTER_FAIL: return { loading:false, error: action.payload };
                default: return  state;
        }
}
export const userUpdateProfileReducer = (state= {}, action) => {
        switch(action.type) {
                case USER_UPDATE_REQUEST: return { loading:true };
                case USER_UPDATE_SUCCESS: return { loading:false, userInfo: action.payload,success:true };
                case USER_UPDATE_FAIL: return { loading:false, error: action.payload,success:false };
                default: return state;
        }
}
export const editUserFromAdminReducer = (state= {}, action) => {
        switch(action.type) {
                case EDIT_USER_FROM_ADMIN_REQUEST: return { loading:true };
                case EDIT_USER_FROM_ADMIN_SUCCESS: return { loading:false, userInfo: action.payload,success:true };
                case EDIT_USER_FROM_ADMIN_FAIL: return { loading:false, error: action.payload,success:false };
                default: return state;
        }
}
export const userAllReducer = (state= {}, action) => {
        switch(action.type) {
                case USER_ALL_REQUEST: return { loading:true };
                case USER_ALL_SUCCESS: return { loading:false, userInfo: action.payload,success:true };
                case USER_ALL_FAIL: return { loading:false, error: action.payload,success:false };
                default: return state;
        }
}
export const userSearchReducer = (state = {}, action) =>{
        switch (action.type) {
                case USER_GETUSERBYSEARCH_REQUEST:
                        return { loading: true };
                case USER_GETUSERBYSEARCH_SUCCESS:
                        return { loading: false, userInfoBySearch: action.payload };
                case USER_GETUSERBYSEARCH_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}
export const userDeleteReducer = (state = {}, action) =>{
        switch (action.type) {
                case USER_DELETE_REQUEST:
                        return { loading: true };
                case USER_DELETE_SUCCESS:
                        return { loading: false, userInfo: action.payload };
                case USER_DELETE_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}
export const userGetDetailsReducer = (state = {}, action) =>{
        switch (action.type) {
                case USER_GET_DETAILS_REQUEST:
                        return { loading: true };
                case USER_GET_DETAILS_SUCCESS:
                        return { loading: false, userInfoById: action.payload,profile:false };
                case USER_GET_DETAILS_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}
export const userConfirmReducer = (state = {}, action) =>{
        switch (action.type) {
                case USER_CONFIRM_REQUEST:
                        return { loading: true };
                case USER_CONFIRM_SUCCESS:
                        return { loading: false, isConfirmed: action.payload };
                case USER_CONFIRM_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}    
