import { supabase } from '/src/api/hello.js'
    
async function signInWithDiscord() {

  const { data , error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  });
}

function mainPage() {

  return(
    <div className="login-container">
     <div className="login-square">
      <h2 className="login-header">Pokedex</h2>
      <form className="login-form">
          <label htmlFor="login">Username:</label>
          <input type="text" id="login" name="login"/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Login" />

           Login With: <a className="login" onClick={signInWithDiscord}>
            <img 
              src="https://th.bing.com/th?id=OIP.LK0ek7mvd3gPWqgPUrj-2QHaFn&w=287&h=217&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" 
              alt="Sign up with Discord"
            /> 
          </a>

          <div className="separator"></div>

          Sign-up With: <a className="login" onClick={signInWithDiscord}>
            <img 
              src="https://th.bing.com/th?id=OIP.LK0ek7mvd3gPWqgPUrj-2QHaFn&w=287&h=217&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" 
              alt="Sign up with Discord"
            /> 
          </a>
           </form>
    </div>
  </div>)
}

export default mainPage;