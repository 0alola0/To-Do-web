import React from 'react';
import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";


const UserForm = ({actionName, username, password, setUsername, setPassword, handleSubmit, permission, permissionLabel}) => {
  return (
      <form action="register" onSubmit={handleSubmit} className="registration-form" >
          <h3 className="logo">{actionName}</h3>
          <div className="input-container">
              <UserIcon width={26} height={26} className="h-6 w-6 text-gray-500" />
              <input className="user-inp" value={username} type="text" placeholder="username" onChange={(event)=> setUsername(event.target.value)} />
          </div>
          <div className="input-container">
              <KeyIcon width={26} height={26} className="h-6 w-6 text-gray-500" />
              <input className="user-inp" value={password} type="password" placeholder="password" onChange={(event)=> setPassword(event.target.value)}/>
          </div>
          <div className="input-container">
              <button disabled={!permission} className={permission? "login-btn" : "login-btn disabled-btn"} type="submit">{actionName}</button>
              {!permission? <h6 className="disable-text">{permissionLabel}</h6> : ""}
          </div>
      </form>
  );
}

export default UserForm;
