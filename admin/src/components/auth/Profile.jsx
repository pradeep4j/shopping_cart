import React,{ useEffect } from 'react';
import {  Container,Typography,FormGroup,FormControl,TextField,Button,FormControlLabel,InputLabel,Select,MenuItem,FormLabel,RadioGroup, Radio,Avatar ,ImageListItem,ImageList,InputAdornment,IconButton,TablePagination,Alert,Stack,Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Table, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Loading from "../layout/Loading";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { deepOrange } from '@mui/material/colors';
import '../../hide.css';
import {updateUser} from '../../store/actions/authActions';
import { listMyOrders } from '../../store/actions/orderActions';
import getDateString from '../../utils/getDateString';

const Profile = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [name,setName] = useState('');
    const [occupation,setOccupation] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [description,setDescription] = useState('');
    const [gender,setGender] = useState('');
    const [age,setAge] = useState('');
    const [isAdmin,setIsadmin] = useState(false);
    const [image,setImage] = useState('');
    const [imagePreview,setImagePreview] = useState('');
    const [spinner,setSpinner] = useState(true);
    const [values, setValues] = useState({showPassword: false});
    const [valuesRe, setValuesRe] = useState({showRePassword: false});
    const [dataPage, setDataPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    let { loading, success } = userUpdateProfile;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    //listing my orders
    const orderListMy = useSelector((state) => state.orderListMy);
    const {loading:orderLoading, error:orderError, orders} = orderListMy;
    const count=orders?.length;
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 2));
      setPage(0);
    };
    //image handling
    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
    
        TransformFileData(file);
    };
    //reading image using The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    const TransformFileData = (file) => {
        const reader = new FileReader();
     //   formik.errors.image=null;
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            document.getElementById("pic").src = reader.result;
            setImage(reader.result);
            setImagePreview("");
          };
        } else {
            setImage("");
        }
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleClickShowRePassword = () => {
        setValuesRe({ ...valuesRe, showRePassword: !valuesRe.showRePassword });
    };
    let savedValues = {
                name: name,
                occupation: occupation,
                email: email,
                password: '',
                repassword:'',
                phone: phone,
                description: description,
                age: age,
                gender: gender,
                isAdmin:isAdmin,
                image:imagePreview

    }
    const initialValues ={
        name:'',
        occupation:'',
        email:'',
        password:'',
        repassword:'',
        phone:'',
        description:'',
        age:'',
        gender:'',
        image:'',
        isAdmin:''
  }
    const schema = Yup.object({
        name:    Yup.string()
                    .required('Name is required!')
                    .min(3, 'Name should have of minimum 3 characters')
                    .max(50, 'Name should have of minimum 30 characters'),
        occupation: Yup.string()
                    .required("Occupation is required!")
                    .min(3,"Occupation should have minimum 3 characters!")
                    .max(30,"Occupation should have maximum 30 characters!"),
        email: Yup.string()
                    .required("Email is required!")
                    .email("Email is invalid!")
                    .min(8,'Email should have of minimum 8 characters length!'),
        password: Yup.string()
                    .min(8, 'Password should be of minimum 6 characters length')
                    .max(30, 'Password should be of minimum 30 characters length')
                    .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.'),
        repassword: Yup.string('')
                    .min(8, 'Re Password should be of minimum 6 characters length')
                    .max(30, 'Re Password should be of minimum 30 characters length')
                    .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.')
                    .when('password', {
                    is: (val) => !!(val && val.length > 0),
                    then: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'Password and Retype Password do not match')
                    }),                        
        phone: Yup.string()
                    .required("Phone is required!")
                    .min(10,"Phone should have minimum 10 digits!"),
        description: Yup.string()
                    .required("Description is required!")
                    .min(3,"Descrition should have minimum 3 characters!")
                    .max(1500,"Descrition should have maximum 1500 characters!"),
        age:         Yup.string()
                        .required("Age is required!"),       
        gender:     Yup.string()
                    .required("Please select a gender!"),               
        /*image: Yup.mixed()
                .nullable()
                .required("Image is required!")
                .test('type',  "We only support jpeg/jpg/png/bmp formats", function (value) {
                    //alert('Here='+value.type)
                    return value && (value.type === "image/jpeg" || 
                                    value.type === "image/bmp" || 
                                    value.type === "image/jpg" || 
                                    value.type === "image/png")}),
        recaptcha : Yup.string()
                    .required("Please confirm that you are not a robot, to select checkbox!") */                          
    })
    const formik = useFormik({
        initialValues: (savedValues || initialValues),
        validationSchema: schema,
        enableReinitialize:true,  //this variable must be true if data comes from API
        onSubmit: (values,{resetForm}) => {
            onUpdateProfile(values,resetForm);
        }
    })
    
    const onUpdateProfile = (val) => {
        const postBody = {
            name:val.name,
            occupation: val.occupation,
            email:val.email,
            password:val.password,
            phone: val.phone,
            description: val.description,
            age:val.age,
            gender:val.gender,            
            isAdmin:isAdmin,
            image:image
        }
      //  alert(JSON.stringify(postBody));return;
        document.getElementById("submitting").innerText = "Updating Profile...Please wait!";
        document.getElementById("submitting").disabled  = true;
        dispatch(updateUser(postBody,id,userInfo._id));
           
    }
    useEffect(() => {
            setSpinner(false);
            //alert(userInfo.image.url);
            setName(userInfo.name);
            setOccupation(userInfo.occupation);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
            setDescription(userInfo.description);
            setGender(userInfo.gender);
            setAge(userInfo.age);
            setIsadmin(userInfo.isAdmin);
            setImagePreview(userInfo.image.url);
        
    },[]);  
    // get my orders by pagenumber
	useEffect(() => {
		if (userInfo) dispatch(listMyOrders(userInfo._id));
		else navigate('/login');
                setPage(0); 
	}, [dispatch,  userInfo, dataPage]);
  return (
  
<Containers>
    <Grid container spacing={1}>
      <Grid xs={5}>
          <Item><center>
           <FormContainer style={
            userInfo && !userInfo.isConfirmed
                ? {
                        opacity: '0.5',
                        pointerEvents: 'none',
                }
                : {
                        opacity: '1',
                        pointerEvents: '',
                }
            }>
            <center><Avatar style={{alignItems:'center'}} sx={{ bgcolor: deepOrange[500] }} /></center>
            <Typography variant="h5" style={{textAlign:'center'}}>Update Profile <Ptags>(All the field having * are required)</Ptags></Typography>{userUpdateProfile.profile}
            {(loading && <Loading />) || (spinner===true && <Loading />)} {(success && navigate("/"))} 
            {userInfo && !userInfo.isConfirmed ? (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="info">
                        Your Account has been Created! Please check your email to verify your account and start shopping
                    </Alert>
                </Stack>
                ) : null
            }
            <FormControl>
                    <TextField 
                            value={formik.values.name} 
                            required='required'
                            id="name"
                            name="name" 
                            label="Name"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} 
                    />
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.occupation} 
                               label="Occupation" 
                               name="occupation" 
                               onChange={formik.handleChange} required 
                               error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                               helperText={formik.touched.occupation && formik.errors.occupation}
                               />
                </FormControl>                 
                <FormControl>
                <TextField 
                            value={formik.values.email} 
                            required='required'
                            id="email"
                            name="email" 
                            label="Email"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} 
                    /><Spanning id="email-error"></Spanning>
                </FormControl>
                <FormControl>
                <TextField 
                            value={formik.values.password} 
                            required='required'
                            id="password"
                            name="password" 
                            label="Password"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
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
                                  
                            )}}
                    />
                </FormControl> 
                <FormControl>
                <TextField 
                            value={formik.values.repassword} 
                            required='required'
                            id="repassword"
                            name="repassword" 
                            label="RePassword"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.repassword && Boolean(formik.errors.repassword)}
                            helperText={formik.touched.repassword && formik.errors.repassword} 
                            type={valuesRe.showRePassword ? 'text' : 'password'} 
                            InputProps={{endAdornment: (
                                
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRePassword}
                                        edge="end"
                                      >
                                        {valuesRe.showRePassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  
                            )}}
                    />
                </FormControl> 
                <FormControl>
                    <TextField value={formik.values.phone} 
                               required
                               label="Phone" 
                               name="phone" 
                               onChange={formik.handleChange} 
                               type="number" 
                               onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,10)}}  
                               error={formik.touched.phone && Boolean(formik.errors.phone)}
                               helperText={formik.touched.phone && formik.errors.phone}
                               />
                </FormControl>     
                <FormControl>
                    <TextField value={formik.values.description} 
                               label="Description" 
                               name="description" 
                               onChange={formik.handleChange} required 
                               multiline
                               rows={4}
                               error={formik.touched.description && Boolean(formik.errors.description)} 
                               helperText={formik.touched.description && formik.errors.description}/>
                </FormControl>
                <FormControl>
                    <InputLabel label="Age" required error={formik.touched.age && Boolean(formik.errors.age)} 
                               helperText={formik.touched.age && formik.errors.age} >Age</InputLabel>
                    <Select value={formik.values.age} 
                               label="Age" 
                               name="age" 
                               onChange={formik.handleChange} required 
                               error={formik.touched.age && Boolean(formik.errors.age)} 
                               helperText={formik.touched.age && formik.errors.age}>
                        <MenuItem value="10">10 Years</MenuItem>
                        <MenuItem value="20">20 Years</MenuItem> 
                        <MenuItem value="30">30 Years</MenuItem> 
                        <MenuItem value="40">40 Years</MenuItem>     
                        <MenuItem value="50">50 Years</MenuItem>
                        <MenuItem value="60">60 Years</MenuItem> 
                        <MenuItem value="70">70 Years</MenuItem> 
                        <MenuItem value="80">80 Years</MenuItem>
                    </Select>       
                </FormControl>  
                <Spannings id="age-error">{(formik.touched.age && formik.errors.age)?<div>{formik.errors.age}</div>:''}   </Spannings>                 
                <FormControl  className="fieldset">
                    <FormLabel  required error={formik.touched.gender && Boolean(formik.errors.gender)} 
                        helperText={formik.touched.gender && formik.errors.gender} style={{textAlign:'left',fontSize:'13px'}}>Gender</FormLabel>
                    <RadioGroup
                        value={formik.values.gender}
                        row
                        name="gender" // eslint-disable-next-line no-unused-expressions 
                        onChange={(e) => {formik.handleChange;formik.setFieldValue("gender",e.currentTarget.value)}}
                        required 
                       /* error={formik.touched.gender && Boolean(formik.errors.gender)} 
                        helperText={formik.touched.gender && formik.errors.gender*}*/>
                        <FormControlLabel style={{textAlign:'left',fontSize:'10px'}}
                                value="Male"
                                control={<Radio />} 
                                label="Male" 
                                />
                        <FormControlLabel style={{textAlign:'left',fontSize:'10px'}}
                                value="Female"
                                control={<Radio />} 
                                label="Female" 
                                />
                    </RadioGroup>
                 </FormControl>         
                 <Spannings id="gender-error">{(formik.touched.gender && formik.errors.gender)?<div>{formik.errors.gender}</div>:''}   </Spannings>                  
                <FormControl>                                
                    <ImageList>
                        
                        <Ptags ><Typography style={{fontSize:'15px',textAlign:'left'}}>Choose an image</Typography>
                                    <input
                                    id="image"
                                    accept="image/*"
                                    name="image"
                                    type="file"
                                    onChange={(e) => {handleProductImageUpload(e);formik.setTouched({
                                        ...formik.touched.image
                                      });formik.setFieldValue( "image", e.target.files[0] )}}
                                    />
                        </Ptags>
                                <ImagePreview>
                                    {(image || (imagePreview)) ? (
                                    <>
                                        <div><img src={imagePreview?imagePreview:image} alt="error!" id="pic"/></div>
                                    </>
                                    )  : (
                                    <p>Product image upload preview will appear here!</p>
                                    )}
                                </ImagePreview>
                    </ImageList>
                    <Spannings id="iamges">{(formik.touched.image && formik.errors.image)?<div>{formik.errors.image}</div>:null}</Spannings>
                </FormControl>  
                <FormControl>
                    <Buttons variant="contained" type="submit" id="submitting" onClick={(e) => formik.handleSubmit()}>Update Profile</Buttons>
                </FormControl>
          </FormContainer>
          </center>
          </Item>
          </Grid><Grid xs={7}>
                    <Item>
                        <>
                        <Row className='align-items-center'>
                                <Col>
                                <center><h4>All Orders ({`${count || 0}`})</h4></center>
                                </Col>
                        </Row>
                        {orderLoading ? (
                                <Loading />
                        ) : orderError ? (
                                <Spanning dismissible variant='danger' duration={10}>
                                        {orderError}
                                </Spanning>
                        ) : (
                            <Table
                                striped
                                bordered
                                responsive
                                className='table-sm text-center'>
                                    <thead className='fonts' >
                                        <tr>
                                            <th>ID</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                            <th>Paid</th>
                                            <th>Delievred</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
                                        return (
                                                <tr key={order._id}>
                                                        <td>{order._id}</td>
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
                    </Item>
                </Grid>
        </Grid> 
</Containers>   
  )
}

export default Profile;
const Containers = styled(Container)`
margin: 2% auto 2% auto;
`
const FormContainer = styled(FormGroup)`
width: 65%;
margin: 4% auto 0 auto;
& > div {
    margin-top:10px;
    
}
`
const Spanning =  styled(FormLabel)`
color: red;
font-size:12px;
`
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 70%;
`
const ImagePreview = styled(ImageListItem)`
  border: 1px solid rgb(183, 183, 183);
  max-width: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`
const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`
const Error =  styled(FormLabel)`
color: white;
font-size:12px;
font-weight:bold;
background-color:red;
`

