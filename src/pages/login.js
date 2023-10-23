import { supabase } from '/src/api/hello.js';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}
  
  function mainPage() {
  return(<>
          <Button size="small" variant="contained" onClick={() => {
                signInWithDiscord()
          }}>Login</Button>
  </>)
}
export default mainPage