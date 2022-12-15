import React,{useState} from 'react';
import {useNavigate,NavLink} from 'react-router-dom';
import {TextField,FormGroup,FormLabel,FormControl,ImageList,ImageListItem,FormControlLabel,Checkbox,styled,Typography,InputLabel,Select,MenuItem,Button} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Loading from '../layout/Loading';
import { useDispatch,useSelector } from 'react-redux';
import {createProducts} from '../../store/actions/productActions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const Listproducts = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const createProduct = useSelector(state=>state.createProduct);
   const {loading,productInfo} = createProduct;
   const [image,setImage] = useState('');
   const [isPurchased,setIsPurchased] = useState('');

   const initialValues={
        name:'POCO F1 (Steel Blue, 128GB, 6GB RAM)',
        rate:'16332',
        description:'',
        numberOfItem:'4',
        ratings:'4',
        image:'',
        isPurchased:''
  }
  const schema = Yup.object({
                   name: Yup.string()
                            .required('Name of item is required!')
                            .min(8,"Name should of minimum 8 characters!")
                            .max(100,"Name should of maximum 50 characters!"),
                   rate: Yup.number()
                            .required('Rate of item is required!'),
            description: Yup.string()
                            .required('Description of item is required!')
                            .min(8,"Description should of minimum 8 characters!")
                            .max(1500,"Description should be of maximum 150 characters!"),
           numberOfItem: Yup.number()
                            .required('Number of item is required!'),
                ratings: Yup.number()
                            .required('Ratings of item is required!'),
                  image: Yup.mixed()
                            .required('Image is required!')
                            .test('type', 'We only support .jpeg/.jpg/.png', (value) => {
                                return (value && (value.type === "image/jpeg" ||
                                                  value.type === "image/jpg" ||
                                                  value.type === "image/png"))
                            }),
            isPurchased: Yup.string()
                            .required('Purchase disclaimer of item is required!'),       
  })
  const formik = useFormik({
        initialValues:initialValues,
        validationSchema:schema,
        onSubmit: (values,{resetFor}) =>{
                submitProduct(values,resetFor);
        }
  });
  const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFileData(file);
  }
  const TransformFileData = (file) => {
    const reader = new FileReader();
    const fileType =file.type;
    let types = false; 
    if(fileType!=="image/jpeg" && fileType!=="image/bmp" && fileType!=="image/jpg" && fileType!=="image/png"){
        types = true; 
    }
    else{
        types = false;
    }
    if(types===false){
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setImage(reader.result);
            }
        }
    }
    else{
        setImage("");
    }

  };
  const submitProduct = (val) => {
        const postBody = {
                name: val.name,
                rate: val.rate,
                description: val.description,
                numberOfItem:val.numberOfItem,
                ratings:val.ratings,
                image:image,
                isPurchased:isPurchased
        }
                //alert(JSON.stringify(isPurchased));return;
                document.getElementById("submitting").innerText = "Adding products...Please wait";
                document.getElementById("submitting").disabled  = false;
                dispatch(createProducts(postBody));
  }
  useEffect(() => {
        if(productInfo){
                navigate("/listproduct")
        }
  },[productInfo,navigate])
return (
   <Container>
        <center><div id="ex4"><i class="fa fa-mobile fa-4x" aria-hidden="true" sx={{ bgcolor: deepOrange[500] }}></i></div>
        <Typography variant="h5">Add Product <Ptags>(All the field having * are required)</Ptags></Typography></center>
        {loading && <Loading />}
            <FormControl id="name">
                <TextField 
                           value={formik.values.name} 
                           required
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
                <TextField value={formik.values.rate} 
                           label="Rate" 
                           name="rate" 
                           onChange={formik.handleChange} required 
                           error={formik.touched.rate && Boolean(formik.errors.rate)}
                           helperText={formik.touched.rate && formik.errors.rate}
                           />
            </FormControl> 
            <FormControl>
                <TextField value={formik.values.description} 
                           label="Description" 
                           name="description" 
                           onChange={formik.handleChange} required 
                           error={formik.touched.description && Boolean(formik.errors.description)} 
                           helperText={formik.touched.description && formik.errors.description}
                           id="outlined-multiline-static"
                           multiline
                           rows={4}
                           defaultValue="Default Value"
                           variant="outlined"/>
            </FormControl>
            <FormControl>
                <InputLabel label="Number of Items" required 
                           error={formik.touched.numberOfItem && Boolean(formik.errors.numberOfItem)} 
                           helperText={formik.touched.numberOfItem && formik.errors.numberOfItem}>Number of Items</InputLabel>
                <Select value={formik.values.numberOfItem} 
                           label="Number of Items" 
                           name="numberOfItem" 
                           onChange={formik.handleChange} required 
                           error={formik.touched.numberOfItem && Boolean(formik.errors.numberOfItem)} 
                           helperText={formik.touched.numberOfItem && formik.errors.numberOfItem}>
                            
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem> 
                    <MenuItem value="3">3</MenuItem> 
                    <MenuItem value="4">4</MenuItem>     
                </Select>    
                <Spannings id="items-error">{(formik.touched.numberOfItem && formik.errors.numberOfItem)?<div>{formik.errors.numberOfItem}</div>:''}   </Spannings>   
            </FormControl>  
            <FormControl>
                <InputLabel label="Product Ratings" required error={formik.touched.ratings && Boolean(formik.errors.ratings)} 
                           helperText={formik.touched.age && formik.errors.age}>Product Ratings</InputLabel>
                <Select value={formik.values.age} 
                           label="Product Ratings" 
                           name="ratings" 
                           onChange={formik.handleChange} required 
                           error={formik.touched.ratings && Boolean(formik.errors.ratings)} 
                           helperText={formik.touched.ratings && formik.errors.ratings}>
                            
                    <MenuItem value="2">2 stars</MenuItem>
                    <MenuItem value="3">3 stars</MenuItem> 
                    <MenuItem value="4">4 stars</MenuItem> 
                    <MenuItem value="5">5 stars</MenuItem>     
                </Select>   
                <Spannings id="rating-error">{(formik.touched.ratings && formik.errors.ratings)?<div>{formik.errors.ratings}</div>:''}   </Spannings>     
            </FormControl>            
     
                <ImageList>
                    
                    <Ptags id="descriptions"><Typography style={{fontSize:'15px'}} >Choose an image *</Typography>
                                <input
                                id="images"
                                accept="image/*"
                                type="file"
                                name="image"
                                onChange={(e) => {handleProductImageUpload(e);formik.setTouched({
                                    ...formik.touched.image
                                  });formik.setFieldValue( "image", e.target.files[0]) }}
                                required

                                />
                    </Ptags>
                            <ImagePreview>
                                {image ? (
                                <>
                                    <img src={image} alt="error!" />
                                </>
                                ) : (
                                <p>Product image upload preview will appear here!</p>
                                )}
                            </ImagePreview>
                </ImageList>
                <Spannings id="images-error">{(formik.touched.image && formik.errors.image)?<div>{formik.errors.image}</div>:null}</Spannings>
                <FormControl>
                        <FormControlLabel  control={<Checkbox />}
                                label='Purchase Disclaimer'
                                name="isPurchased"
                                checked={isPurchased}
                                required 
                                onChange={(e) => {setIsPurchased(e.target.checked);formik.setFieldValue( "isPurchased", e.target.checked);}}></FormControlLabel>
                <Spannings id="isPurchased-error">{(formik.touched.isPurchased && formik.errors.isPurchased)?<div>{formik.errors.isPurchased}</div>:null}</Spannings>
            </FormControl>                                       
            <FormControl>
                <Buttons variant="contained" id="submitting" type="submit" onClick={formik.handleSubmit}>Add Product</Buttons>
            </FormControl>
</Container>
)
}
export default Listproducts;
const Container = styled(FormGroup)`
width: 40%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}`
const Ptags =  styled('p')`
font-size:10px;
`

const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 1rem;
`
const Buttons =  styled(Button)`
width: 80%;
`
const ImagePreview = styled(ImageListItem)`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`