import { supabase } from '/src/api/hello.js'

import { Button } from '@mui/material'
async function signInWithDiscord() {
/*  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })*/
  const { RPCData, RPCError } = await supabase.rpc('createuser')
  .then(e => {console.log(e)});
}

function mainPage() {
  return(<>
          <Button size="small" variant="contained" onClick={() => {
                signInWithDiscord()
          }}>Login</Button>
  </>)
}
export default mainPage