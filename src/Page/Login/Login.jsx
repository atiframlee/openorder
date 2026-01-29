import React, { useState } from 'react';
import './Login.css';
import { IconBrandFacebookFilled, IconBrandAppleFilled, IconKey,IconKeyFilled, IconUserEdit, IconUser, IconMail, IconLock } from '@tabler/icons-react';
import google from '../../Assets/google.png';
import Modal from '../../components/Modal';
import { useAtom } from 'jotai';
import { modalAtom } from '../../store/atoms';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function Login() {
  const [modal, setModal] = useAtom(modalAtom);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    if (modal === false) {
      setLogin(false);
      setSignup(false);
    }
  }, [modal]);

  const handleSignUp = async () => {
    setIsLoading(true); // Start loading

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false); // Stop loading
    setModal(false);
    setSignup(false);
    navigate('/home');
  };

  const handleLogin = async () => {
    setIsLoading(true); // Start loading

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false); // Stop loading
    setModal(false);
    setLogin(false);
    navigate('/home');
  };

  const openSignup = () => {
    setModal(!modal);
    setSignup(!signup);
    setLogin(false);
  };

  const openLogin = () => {
    setModal(!modal);
    setLogin(!login);
    setSignup(false);
  };

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >

      <div className="loginOOCon">
        <div className="loginTitle">
          <span>
            <IconKeyFilled size={30} />
          </span>
          <span>Sign In</span>
        </div>
        <p className="loginOO">
          <span className="loginTSmall">to</span> Open Order
        </p>
      </div>

      <div className="medsosCon" onClick={handleLogin}>
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

      {modal && signup ? (
        <Modal>
          <div className="signup">
            <div className="signupIcon">
              <IconUserEdit size={50} />
            </div>
            <p className="signupTitle">Sign Up</p>

            <p className="signupMessage"><b>Welcome!</b> Enter your email and password to get started.</p>

            <span className="loginLabel"><IconMail size={18} className="logI" /> Email Address</span>
            <input
              type="email"
              className="signupIn"
              placeholder="Enter your Email address"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <span className="loginLabel"><IconLock size={18} className="logI" />Passwords</span>
            <input type="password" className="signupIn" placeholder="Enter your password" />

            <div
              className={`signupButton ${isLoading ? 'loading' : ''}`}
              onClick={handleSignUp}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                'Sign Up'
              )}
            </div>
          </div>
        </Modal>
      ) : null
      }

      {
        modal && login ? (
          <Modal>
            <div className="signup">
              <div className="signupIcon">
                <IconUser size={50} />
              </div>
              <p className="signupTitle">Sign in</p>

              <p className="signupMessage"><b>Welcome Back!</b> Let's get you signed in.</p>

              <span className="loginLabel"><IconMail size={18} className="logI" /> Email Address</span>
              <input
                type="email"
                className="signupIn"
                placeholder="Enter your Email address"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <span className="loginLabel"> <IconLock size={18} className="logI" /> Passwords</span>
              <input type="password" className="signupIn" placeholder="Enter your password" />

              <div
                className={`signupButton ${isLoading ? 'loading' : ''}`}
                onClick={handleLogin}
              >
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  'Sign In'
                )}
              </div>

              <p className="forgotPass">Forgot password? <b className="resPass">Reset password</b></p>
            </div>
          </Modal>
        ) : null
      }
    </motion.div >
  );
}

export default Login;