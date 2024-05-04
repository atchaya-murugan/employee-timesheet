import { useState } from 'react'
import React from 'react'
import { Link , Navigate, useNavigate} from 'react-router-dom';
import csimage from '../../assets/time-attendance-system.png'
import clogo from '../../assets/clock-logo (1).jpg'
import Validation from './SignUpValidation';
import axios from 'axios';
import { doCreatingUserWithEmailAndPassword } from '../../Firebase/auth';
import { useAuth } from '../../Contexts/authContext/index';


const Signup = () => {

  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();

    const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [rightSideHeight, setRightSideHeight] = useState('300px');

  const [errors, setErrors] = useState({})
  
  const [isSigningUp, setSigningUp ] = useState(false) ;
  const [ errorMessage, setErrorMessage ] = useState('');
  

  const handleSubmit1 = () => {
  
  }

  const handleSubmit = async (event) => {
       event.preventDefault();
       const validationErrors = Validation(name, number, email, password);
       setErrors(validationErrors);

      if(Object.keys(validationErrors).length === 1) {
      
        setRightSideHeight('340px');
    }
  else if (Object.keys(validationErrors).length === 2) {
    
    setRightSideHeight('370px');
}
else if (Object.keys(validationErrors).length === 3) {
  
  setRightSideHeight('400px');
}
else if (Object.keys(validationErrors).length === 4) {

  setRightSideHeight('430px');
}

if(Object.keys(validationErrors).length === 0) {
      
  axios.post('http://localhost:8081/user_det', {
  name: name,
  email: email,
  number: number,
  password: password,
  
})

.catch(error => {
  console.error('Error:', error);
});
navigate('/login'); 
}




      
  }
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
     
            <div className='auth-card right-side' style={{ height: rightSideHeight }}>
              <h3 className='signup-txt'>Create Account</h3>
              <form action='' onSubmit={handleSubmit} className='signup-form'>
              <div>
                <input type='text' onChange={e => {setName(e.target.value)}} name='name' placeholder='Name' className='form-control signup-ip1 signup-ip' autoComplete='off' />
                <p className='err-msg'> {errors.name && <span className='ip-valid'> {errors.name}</span> } </p>
                </div>
                <div>
                  <input type='email' onChange={e => {setEmail(e.target.value)}} name='email' placeholder='Email' className='form-control signup-ip1 signup-ip' autoComplete='off' />
                  <p className='err-msg'> {errors.email && <span className='ip-valid'> {errors.email}</span> } </p>
                </div>
                <div>
                  <input type='tel' onChange={e => {setNumber(e.target.value)}} name='mobile' placeholder='Mobile Number' className='form-control signup-ip2 signup-ip' autoComplete='off' />
                  <p className='err-msg'> {errors.number && <span className='ip-valid'> {errors.number}</span> } </p>
                </div>
                <div>
                  <input type='password' onChange={e => {setPassword(e.target.value)}} name='password' placeholder='Password' className='form-control signup-ip3 signup-ip' autoComplete='off' />
                  <p className='err-msg'> {errors.password && <span className='ip-valid'> {errors.password}</span> } </p>
                </div>
                <p className='err-msg'>{errorMessage && <span className='ip-valid'>{errorMessage}</span>}</p>
                <div>
                  <div className='create-btn'>
                    
                    <button className='button log-btn sign-btn' type='submit' >Create</button>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        
    </>
  );
};

export default Signup;