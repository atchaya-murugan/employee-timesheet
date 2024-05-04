import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import clogo from '../../assets/clock-logo (1).jpg'
import csimage from '../../assets/time-attendance-system.png'
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Validation from './LoginValidation';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../Firebase/auth';
import { useAuth } from '../../Contexts/authContext/index';
import { doPasswordChange } from '../../Firebase/auth'


const Login = () => {

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ userName, setUserName] = useState('');
  const [ userEmail, setUserEmail] = useState('');

  const [errors, setErrors] = useState({})

  const [rightSideHeight, setRightSideHeight] = useState('320px');

  const [isSigningIn, setSigningIn ] = useState(false) ;
  const [ errorMessage, setErrorMessage ] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(email, password);
    setErrors(validationErrors);
if (!isSigningIn) {
  setSigningIn(true);
  try {
    await doSignInWithEmailAndPassword(email, password);
  } catch (error) {
  
    setErrorMessage(error.message);
    setRightSideHeight('360px'); 
  }
}}

const handleSubmit1 = async (event) => {
  event.preventDefault();
  const validationErrors = Validation(email, password);
  setErrors(validationErrors);
  
  // Make a GET request to check if the user exists in the database
  try {
    const response = await axios.get('http://localhost:8081/user_det', {
      params: {
        email: email,
        password: password
      }
    });
    if (response.data.length > 0) {
      const user = response.data[0]; 
  setUserName(user.name);

   navigate('/', { state: { isLoggedIn: true, userName: user.name, userEmail: user.email } });
    } else {
      setErrorMessage("Invalid Email or Password");
      setRightSideHeight('360px'); 
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


 

  return (
    <>

      <div className='auth-logo logo d-flex'>
        <img src={clogo} className='auth-lg logo-image'/>  
        <div className='auth-clk clocksheet'>
          <h1>lock<span className='clk-span1'>y</span ><span className='clk-span2'>S</span>heet</h1>
        </div>  
      </div>
        
    
      <div className='login-cont'>
       <div className='left-side'>
        <div className='cs-img'>
          <img src={csimage} />
        </div>
         <h2 className='img-btm'>An Anyone Remainder again? <br /> Fill In Your TimeSheet</h2>
      </div>
      <div className='right-side' style={{height: rightSideHeight }}>    
              <h3 className='log-txt'>Login</h3>
              <form onSubmit={handleSubmit1} className='login-form' >
                <div>
                  <MdMail className='log-icon' />
                  <input type='email' onChange={e => {setEmail(e.target.value)}} name='email' placeholder='Email' className='form-control log-icon1' autoComplete='off' />
                  
                </div>
                <div>
                  <RiLockPasswordFill className='log-icon'/>
                  <input type='password' onChange={e => {setPassword(e.target.value)}} name='password' placeholder='Password' className='form-control log-icon2 ' autoComplete='off' />   
                              
                </div>
                <p className='err-msg'>{errorMessage && <span className='ip-valid'>{errorMessage}</span>}</p>
                <div className='for-div'>
                  
                  <div>
                   <Link className='forgot' to='/Forgot'>Forgot Password ?</Link>
                  </div>

                  <div className='login-btn'>
                    <button type='submit' className='create'>Login</button>                   
                  </div>

                  <div className='signup-btn create-new'>
                    <Link to='/Signup' className='button signup'>Create New
                    </Link>
                  </div>

                </div>
               
              </form>
            </div>
          </div>
      
       
    </>
  )
}

export default Login;