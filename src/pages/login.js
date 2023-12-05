import { supabase } from '/src/api/hello.js';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { Button } from '@mui/material';

async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  });
}

function MainPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const signUpNewUser = async (login, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: login,
      password: password,
      options: {
        emailRedirectTo: '/localhost::3000'
      }
    });
  };

  const signInWithEmail = async (login, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login,
      password: password,
    });
    if (!error) {
      router.push('/');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignUp) {
      await signUpNewUser(login, password);
    } else {
      await signInWithEmail(login, password);
    }
  };

  return (
    <div className='loginBackground'>
      <div className="login-container">
        <div className="login-square">
          <h2 className="login-header">Pokédex Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login">Username:</label>
            <input type="text" onChange={(e) => setLogin(e.target.value)} />
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
             <input type="submit" className="login" value="Login" />
            <button type="button" className="signUp" onClick={() => setIsSignUp(!isSignUp)}>
              Sign Up
            </button>
            <h2 className='discord-login'>
              Login With Discord: 
              <a className="login" onClick={signInWithDiscord}>
                <img
                  src="https://th.bing.com/th/id/OIP.KFJoR0xcQFJXOp8rIVxDyQAAAA?w=158&h=159&c=7&r=0&o=5&pid=1.7"
                  alt="Sign up with Discord"
                />
              </a>
            </h2>
          </form>
        </div>
        <div className="buttons-container">
          <div className="button button-blue"></div>
          <div className="button button-red"></div>
          <div className="button button-yellow"></div>
          <div className="button button-green"></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
