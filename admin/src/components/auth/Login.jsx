import React,{useEffect,useRef,useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Typography,FormGroup,FormControl,TextField,styled,Button, FormLabel,Avatar,InputAdornment,IconButton} from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate,Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loginUser} from '../../store/actions/authActions';
import {validateCaptcha} from '../../routes/userRoutes';
import { deepOrange } from '@mui/material/colors';
import Loading from '../layout/Loading';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
//import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({showPassword: false});
    const captchaRef = useRef(null);
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo } = userLogin;

    const initialValues = {
        email: '',
        password: 'Amitabh@2',
        recaptcha:''
      }
    const schema = Yup.object({
        email: Yup.string('')
          .email('Enter a valid email!')
          .required('Email is required!'),
        password: Yup.string('')
          .min(8, 'Password should be of minimum 8 characters length!')
          .max(30, 'Password should be of minimum 30 characters length!')
          .required('Password is required!')// eslint-disable-next-line no-unused-expressions 
          .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/,"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters!"),// eslint-disable-next-line no-unused-expressions
        recaptcha : Yup.string()
                       .required("Please confirm that you are not a robot, to select checkbox!") 
      }); 
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
          onSubmit: (values,{ resetForm }) => {
           onAdminLogin(values, resetForm);
        }
    });
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    const onAdminLogin = async(val) => {
        /** recaptcha code begins */
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        await validateCaptcha(token).then(resp => {
            if(resp.data==="Human"){
               // alert("You are Human"); recaptcha is successfull
            }
            else{
               // alert("You are Robot"); recaptcha is failed
            }

        });
        /** recaptcha code end */
        const postBody = {
            email: val.email,
            password: val.password
        }
        document.getElementById("submitting").innerText="Logging User...Please wait";
        document.getElementById("submitting").disabled=true;            
        dispatch(loginUser(postBody)); 

    }  
    useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    },[userInfo]);

  return (
    <Container>
        <center><Avatar style={{alignItems:'center'}} sx={{ bgcolor: deepOrange[500] }} /></center>
            <Typography variant="h5" style={{textAlign:'center'}}><Ptags>(All the field having * are required)</Ptags></Typography>
            {loading && <Loading />}
            {/* <Form metod="post" onSubmit={(e) =>{ onSubmit(e)}}> */}
                <FormControl>
                    <TextField value={formik.values.email} 
                            required='required'
                            id="email"
                            name="email" 
                           // label="Email"  
                            label={<EmailIcon />} 
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />
                </FormControl> 
                <FormControl>
                    <TextField value={formik.values.password} 
                            required='required' 
                            id='password' 
                            name='password' 
                            //label="Password"  
                            label={<LockIcon />}
                            onChange={formik.handleChange} 
                            /* inputProps={{ maxLength: 50 }} */
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password} 
                            type={values.showPassword ? 'text' : 'password'} 
                            InputProps={{endAdornment: (
                                
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                      >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  
                            )}} />
                </FormControl> 
                {/** recaptcha code begins  */}
                <FormControl>
                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} 
                               theme='light' 
                               ref={captchaRef} // eslint-disable-next-line no-unused-expressions
                               onChange={(e) => {formik.handleChange;formik.setFieldValue( "recaptcha", 'formikchanges')}} 
                               />
                <Spanning id="captcha-error">{(formik.touched.recaptcha && formik.errors.recaptcha)?<div>{formik.errors.recaptcha}</div>:null}</Spanning>
                </FormControl>      
                {/** recaptcha code ends */}
                <FormControl>
                    <Buttons variant="contained" type="submit" id="submitting" onClick={formik.handleSubmit}>Login</Buttons>
                </FormControl><p></p>
                <Link to="/sign-up" reloadDocument style={{textDecoration:'none',color:'Highlight'}}>Do not have an account sign up!!</Link>
    </Container>
  
  )
}

export default Login;

const Container = styled(FormGroup)`
width: 30%;
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
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 100%;
`
