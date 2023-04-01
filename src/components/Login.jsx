import React from 'react';
import Logging from './Logging';
import Registration from './Registration';

const Login = () => {
  return (
    <div className="login-container">
        <Logging/>
        <div className="divider">
            <h4 className="divider-text">or</h4>
        </div>
        <Registration/>
    </div>
  );
}

export default Login;
