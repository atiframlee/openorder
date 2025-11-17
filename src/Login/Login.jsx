import React, { useState } from 'react';
import './Login.css';
import { IconBrandFacebookFilled, IconBrandAppleFilled, IconKey, IconUserEdit, IconUser } from '@tabler/icons-react';
import google from '../Assets/google.png';
import Modal from '../CompAAModal/Modal';
import { useAtom } from 'jotai';
import { modalAtom } from '../AtomStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { useEffect } from 'react';

function Login() {
  const [modal, setModal] = useAtom(modalAtom);
  const [signup,setSignup] =useState(false)
  const [login,setLogin] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    if(modal === false){
      setLogin(false)
      setSignup(false)
    }
  },[modal])

  const handleSignUp = () => {
    setModal(false); // Close the modal
    setSignup(false)
    navigate('/home'); // Navigate to the Home page
  };

  const openSignup = () =>{
    setModal(!modal)
    setSignup(!signup)
  }

  const openLogin = () =>{
    setModal(!modal)
    setLogin(!login)
  }

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0, y: 50 }} // Start off-screen and transparent
      animate={{ opacity: 1, y: 0 }} // Fade in and slide into view
      exit={{ opacity: 0, y: 50 }} // Fade out and slide down
      transition={{ duration: 0.5 }} // Smooth transition
    >
      <div className="loginOOCon">
        <div className="loginTitle">
          <span>
            <IconKey size={30} />
          </span>
          <span>Sign In</span>
        </div>
        <p className="loginOO">
          <span className="loginTSmall">to</span> Open Order
        </p>
      </div>

      <div className="medsosCon">
        <img src={google} alt="" className="loginIcon" height={17} width={17} />
        continue with &nbsp; <b>Google</b>
      </div>

      <div className="medsosCon">
        <span className="loginIconTab">
          <IconBrandFacebookFilled size={20} />
        </span>
        continue with &nbsp; <b>Facebook</b>
      </div>

      <div className="medsosCon">
        <span className="loginIconTab">
          <IconBrandAppleFilled size={20} />
        </span>
        continue with &nbsp; <b>Apple</b>
      </div>

      <div className="div loginOr">Or</div>

      <div className="loginWEmail" onClick={openSignup}>
        Sign Up with Email
      </div>

      <div className="loginIns">
        Already have an Account? <span onClick={openLogin} className="loginButton">Sign In</span>
      </div>

      {modal && signup? (
        <Modal>
          <div className="signup">
            <div className="signupIcon">
              <IconUserEdit size={50} />
            </div>
            <p className="signupTitle">Sign Up</p>

            <p className="signupMessage"><b>Welcome new User!</b> <br />Insert ur desired email address and password to create your account right away.</p>

            <span className="loginLabel">Email Address</span>
            <input
              type="email"
              className="signupIn"
              placeholder="Enter your Email address"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <span className="loginLabel">Passwords</span>
            <input type="password" className="signupIn" placeholder="Enter your password" />
            <div className="signupButton" onClick={handleSignUp}>
              Sign Up
            </div>
          </div>
        </Modal>
      ) : null}


      {modal && login? (
        <Modal>
          <div className="signup">
            <div className="signupIcon">
              <IconUser size={50} />
            </div>
            <p className="signupTitle">Sign in</p>

            <p className="signupMessage"><b>Welcome Back!</b> <br />Lets get you signed in right away.</p>


            <span className="loginLabel">Email Address</span>
            <input
              type="email"
              className="signupIn"
              placeholder="Enter your Email address"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <span className="loginLabel">Passwords</span>
            <input type="password" className="signupIn" placeholder="Enter your password" />
            <div className="signupButton" onClick={handleSignUp}>
              Sign In
            </div>

            <p className="forgotPass">Forgot password? <b>Reset password</b></p>
          </div>
        </Modal>
      ) : null}
    </motion.div>
  );
}

export default Login;