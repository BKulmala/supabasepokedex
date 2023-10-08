import { supabase } from '/src/api/hello.js'

async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}

function mainPage() {
  return(<>
  <button onClick={signInWithDiscord()}>Click me!</button>
  </>)
}
export default mainPage