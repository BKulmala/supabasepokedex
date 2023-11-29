import { supabase } from '/src/api/hello.js';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

async function signInWithDiscord() {

  const { data , error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  });
}

function mainPage() {

  return(

    <div className='loginBackground'>
    <div className="login-container">
     <div className="login-square">
      <h2 className="login-header"> Pokédex Login</h2>
      <form className="login-form">
          <label htmlFor="login">Username:</label>
          <input type="text" id="login" name="login"/>
          <div> 
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" /> 
          </div>
          <input type="submit" value="Login" />
 
            <h2 className='discord-login'> Login With Discord: <a className="login" onClick={signInWithDiscord}>
              <img
                src="https://th.bing.com/th/id/OIP.KFJoR0xcQFJXOp8rIVxDyQAAAA?w=158&h=159&c=7&r=0&o=5&pid=1.7" 
                alt="Sign up with Discord"
              /> 
              </a> 
            </h2>
           </form>
    </div>
          <div class="buttons-container">
            <div class="button button-blue"></div>
            <div class="button button-red"></div>
            <div class="button button-yellow"></div>
            <div class="button button-green"></div>
          </div>

  </div>
  </div>)
}

export default mainPage;