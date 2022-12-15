const validateEmail = (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; /*  another regex   /\S+@\S+\.\S+/  */
        return re.test(email); 
    };
const validatePassword = (password) => {
        var re = /^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/
        return re.test(password); 
}
const validatePhone = (phone) => {
        var re = /^\d{10}$/;
        return re.test(phone);
};
export const signUpValidation = (i,image) => {
        if(document.getElementById("name").value==='')
        {
            document.getElementById("name-error").innerText=`Name is required`;
            document.getElementById("name-error").style.display=`inline`;
            i=true;
        }
        else if((document.getElementById("name").value).length<3){
            document.getElementById("name-error").innerText=`Name shuold be minimum 3 charactors`;
            document.getElementById("name-error").style.display=`inline`;
            
            i=true;            
        }
        else{
            document.getElementById("name-error").style.display=`none`;
        }
        
        if(document.getElementById("email").value==='' ) 
        {
            document.getElementById("email-error").innerText=`Email is required`;
            document.getElementById("email-error").style.display=`inline`;
            i=true;
        }
        else if(validateEmail(document.getElementById("email").value)===false)
        {
            document.getElementById("email-error").innerText=`Email is in not correct format`;
            document.getElementById("email-error").style.display=`inline`;
            i=true;
        }
        else
        document.getElementById("email-error").style.display=`none`;

        if(image==='yes')
        {
                if(document.getElementById("password").value==='') 
                {
                        document.getElementById("password-error").innerText=`Password is required`;
                        document.getElementById("password-error").style.display=`inline`;
                        i=true;
                }
                else if((document.getElementById("password").value).length < 8 )
                {
                        document.getElementById("password-error").innerText=`Password should be minimum of 8 characters`;
                        document.getElementById("password-error").style.display=`inline`;
                        i=true;
                }
                else if(validatePassword(document.getElementById("password").value)===false){
                        document.getElementById("password-error").innerText=`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters`;
                        document.getElementById("password-error").style.display=`inline`;
                        i=true;
                }
                else
                        document.getElementById("password-error").style.display=`none`;
                
                
                if(document.getElementById("repass").value === '')
                {
                        document.getElementById("repass-error").innerText=`Retype Password is required`;
                        document.getElementById("repass-error").style.display=`inline`;
                        i=true;
                }
                else if(validatePassword(document.getElementById("repass").value)===false)
                {
                        document.getElementById("repass-error").innerText=`ReType Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters`;
                        document.getElementById("repass-error").style.display=`inline`;
                        i=true;
                }        
                else if(document.getElementById("password").value !== document.getElementById("repass").value)
                {
                        document.getElementById("repass-error").innerText=`Retype Password must be same as Password`;
                        document.getElementById("repass-error").style.display=`inline`;
                        i=true;
                }
                else
                document.getElementById("repass-error").style.display=`none`;
        }
        else{
                if(document.getElementById("password").value!=='' && (document.getElementById("password").value).length < 8 )
                {
                        document.getElementById("password-error").innerText=`Password should be minimum of 8 characters`;
                        document.getElementById("password-error").style.display=`inline`;
                        i=true;
                }
                else if(document.getElementById("password").value!=='' && (validatePassword(document.getElementById("password").value)===false))
                {
                        document.getElementById("password-error").innerText=`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters`;
                        document.getElementById("password-error").style.display=`inline`;
                        i=true;
                }
                else
                        document.getElementById("password-error").style.display=`none`;
                
                

                if(document.getElementById("repass").value!=='' && validatePassword(document.getElementById("repass").value)===false)
                {
                        document.getElementById("repass-error").innerText=`ReType Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters`;
                        document.getElementById("repass-error").style.display=`inline`;
                        i=true;
                }        
                else if(document.getElementById("repass").value!=='' && (document.getElementById("password").value !== document.getElementById("repass").value))
                {
                        document.getElementById("repass-error").innerText=`Retype Password must be same as Password`;
                        document.getElementById("repass-error").style.display=`inline`;
                        i=true;
                }
                else
                        document.getElementById("repass-error").style.display=`none`;
        }
        if(image==='yes')
        {
                if(document.getElementById("images").value === ''){
                    document.getElementById("images-error").innerText=`Image is required`;
                    document.getElementById("images-error").style.display=`inline`;
                    i=true;
                }
                else 
                    document.getElementById("images-error").style.display=`none`; 
        }

    return i;
}
export const loginUpValidation = (i) => {
        if(document.getElementById("email").value==='' ) 
        {
            document.getElementById("email-error").innerText=`Email is required`;
            document.getElementById("email-error").style.display=`inline`;
            i=true;
        }
        else if(validateEmail(document.getElementById("email").value)===false)
        {
            document.getElementById("email-error").innerText=`Email is in not correct format`;
            document.getElementById("email-error").style.display=`inline`;
            i=true;
        }
        else
        document.getElementById("email-error").style.display=`none`;

        if(document.getElementById("password").value==='') 
        {
            document.getElementById("password-error").innerText=`Password is required`;
            document.getElementById("password-error").style.display=`inline`;
            i=true;
        }
        else if((document.getElementById("password").value).length < 8 )
        {
            document.getElementById("password-error").innerText=`Password should be minimum of 8 characters`;
            document.getElementById("password-error").style.display=`inline`;
            i=true;
        }
        else if(validatePassword(document.getElementById("password").value)===false){
            document.getElementById("password-error").innerText=`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters`;
            document.getElementById("password-error").style.display=`inline`;
            i=true;
        }
        else
            document.getElementById("password-error").style.display=`none`;

        return i;
}
export const studentValidation = (i,image) => {
        if(document.getElementById("name").value==='')
        {
            //document.getElementById('name').closest("div").className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"; 
          //  document.getElementById('name').inputProps.error= true;
            document.getElementById("names-error").innerText=`Name is required`;
            document.getElementById("names-error").style.display=`inline`;
            i=true;
        }
        else if((document.getElementById("name").value).length<3){
          //  document.getElementById('name').closest("div").className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root";             
            document.getElementById("names-error").innerText=`Name shuold be minimum 3 charactors`;
            document.getElementById("names-error").style.display=`inline`;
            
            i=true;            
        }
        else{
            document.getElementById("names-error").style.display=`none`;
           // document.getElementById('name').closest("div").className=""; 
        }

        if(document.getElementById("occupation").value==='')
        {
            document.getElementById("occupations-error").innerText=`Occupation is required`;
            document.getElementById("occupations-error").style.display=`inline`;
            i=true;
        }
        else if((document.getElementById("occupation").value).length<3){
            document.getElementById("occupations-error").innerText=`Occupation shuold be minimum 3 charactors`;
            document.getElementById("occupations-error").style.display=`inline`;
            
            i=true;            
        }
        else{
            document.getElementById("occupations-error").style.display=`none`;
        }
         
        if(document.getElementById("email").value==='' ) 
        {
            document.getElementById("emails-error").innerText=`Email is required`;
            document.getElementById("emails-error").style.display=`inline`;
            i=true;
        }
        else if(validateEmail(document.getElementById("email").value)===false)
        {
            document.getElementById("emails-error").innerText=`Email is in not correct format`;
            document.getElementById("emails-error").style.display=`inline`;
            i=true;
        }
        else
        document.getElementById("emails-error").style.display=`none`;

        if(document.getElementById("phone").value==='')
        {
            document.getElementById("phones-error").innerText=`Phone is required`;
            document.getElementById("phones-error").style.display=`inline`;
            i=true;
        }
        else if(validatePhone(document.getElementById("phone").value)===false){
            document.getElementById("phones-error").innerText=`Phone must be atleast 10 digits`;
            document.getElementById("phones-error").style.display=`inline`;
            i=true;            
        }
        else{
            document.getElementById("phones-error").style.display=`none`;
        }

        if(document.getElementById("description").value==='')
        {
            document.getElementById("descriptions-error").innerText=`Occupation is required`;
            document.getElementById("descriptions-error").style.display=`inline`;
            i=true;
        }
        else if((document.getElementById("phone").value).length<3){
            document.getElementById("descriptions-error").innerText=`Occupation shuold be minimum 3 charactors`;
            document.getElementById("descriptions-error").style.display=`inline`;
            i=true;            
        }
        else{
            document.getElementById("descriptions-error").style.display=`none`;
        }
        if(image==='yes')
        {
            if(document.getElementById("images").value === ''){
                document.getElementById("images-error").innerText=`Image is required`;
                document.getElementById("images-error").style.display=`inline`;
                i=true;
            }
            else 
                document.getElementById("images-error").style.display=`none`; 
        }
        return i;
}
