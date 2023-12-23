import Head from 'next/head'
import Image from 'next/image'
import { Girassol, Inter } from 'next/font/google'
import pokemonBackground from '../../public/grid.png'
import React, {useState, useEffect } from 'react'
import { supabase } from '../api/hello.js'
import TextField from "@mui/material/TextField"
import FormGroup from "@mui/material/FormGroup"
import { Checkbox, FormControlLabel, Button } from '@mui/material'
import { useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic';
const inter = Inter({ subsets: ['latin'] })
const { data: { user } } = await supabase.auth.getUser()

function changeGIF(pokemon) {
  var img = document.getElementById("test");
  img.src = "https://projectpokemon.org/images/normal-sprite/" + pokemon + ".gif";
}

async function login(router) {
      router.push('/login');
  };

async function signOut(router, status, setStatus) {
  const { error } = await supabase.auth.signOut();
  router.push("/login");
}

async function session(status, setStatus) {
  const { data, error } = await supabase.auth.getSession()
  setStatus(true);
  var userEmail = data?.session?.user?.email;
  return userEmail;
}

async function pushUser(user) {
  //while(user == "NULL") {} // Manual await
  //console.log(user);
  //const { data, error } = await supabase.rpc('createuser', {e: user});
}

function Home({ friendCaught, pokemonCaught, Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar}) {
  const [value, setValue] = React.useState();
  const [array, setArray] = useState([]);
  const [user, setUser] = useState("NULL");
  const [status, setStatus] = useState(false);
  var friendKanto = [];
  friendCaught.forEach(element => friendKanto.push(element.kanto));
  var caughtPokemon = { "Kanto":{}, "Johto":{}, "Hoenn":{}, "Sinnoh":{}, "Unova":{}, "Kalos":{}, "Alola":{}, "Galar":{} };
  const intersection = pokemonCaught.filter(energy => friendKanto.includes(energy.kanto));
  useEffect(() => {
      session(status, setStatus).then((e) => { 
        if(e != null)  { 
          setUser(e.substring(0, e.length - 10).replace("@", ''))
        } 
        else {
          setStatus(false);}
        }
      );
      
      pushUser(user);

  })
  const router = useRouter();

  return (

    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png"/>
      </Head>

      <main class="mainPage">

         <div class="logoutButton">
          {status ? 
            (
              <div className='welcome-alt'>
                <p>Welcome {user}</p>
                <Button size="small" variant="contained" onClick={() => signOut(router, status, setStatus)}>
                  Logout {user}
                </Button>
              </div>
            )
            : 
            (
              <div className='welcome'>
                <p>Welcome, Please Login to Access Your Own Pokedex!</p>
                <Button size="small" variant="contained" onClick={() => login(router)}>
                  Login
                </Button>
              </div>
            )
          }

          </div>

        <div class="pokemonChoice">  
        <TextField
          id="outlined-basic"
          variant="filled"
          fullWidth
          label={/*user.email.slice(0,-10)*/"string"}
          onChange={(e) => setValue(e.target.value)}
          sx={{ 
            ml:6,
            mt:4
          }}
        />
        <ul>
        <FormGroup>
        <FormControlLabel labelPlacement="end" 
                    control={<Checkbox sx={{left:45}}{..."label"}
                    onClick={e => {     
                      if(e.target.checked == true) {
                        setArray(pokemonCaught);
                      }
                      if(e.target.checked == false) {
                        setArray([]);
                    }}}/>}
                    label={<span style={{ position: 'relative', right:'-40px' }}>Toggle caught pokemon</span>} />
        <FormControlLabel labelPlacement="end" 
                    control={<Checkbox sx={{left:45}}{..."label"}
                    onClick={e => {     
                      if(e.target.checked == true) {
                        setArray(intersection);
                      }
                      if(e.target.checked == false) {
                        setArray([]);
                    }}}/>}
                    label={<span style={{ position: 'relative', right:'-40px' }}>Compare with friends</span>} />
        </FormGroup>
        {array.map((country) => (
        <li class="filler" onClick={() => changeGIF(country.kanto)} key={country.id}>
        <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + country.kanto + '.png'} alt='Bulbasaur'/>
        {country.kanto}
        </li>
        ))}
      {Kanto.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type +")", }} class="filler" onClick={() => changeGIF(pokemon.name)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.name + '.png'} alt='pokemon.Pokemon'/>
          <Checkbox {...Kanto} color="default" onChange={e => {
          if(e.target.checked == true) {
            caughtPokemon.Kanto[pokemon.name] = pokemon.type;
          }
          if(e.target.checked == false) {
            delete caughtPokemon.Kanto[pokemon.name];
          }
        }}/>
          {pokemon.name}
          </li>
      ))}
      {Johto.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Hoenn.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Sinnoh.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")"}} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Unova.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Kalos.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/x-y/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Alola.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sun-moon/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
      {Galar.filter(pokemon => {if(value == null) {return} else{return pokemon.name.includes(value)}}).map((pokemon) => (
        <li style={{background:"var(--"+pokemon.type+")", }} class="filler" onClick={() => changeGIF(pokemon.Pokemon)} key={pokemon.id}>
          <Image width='70'height='70'src={'https://img.pokemondb.net/sprites/sword-shield/normal/' + pokemon.Pokemon + '.png'} alt='Bulbasaur'/>
          <br /><br />
          {pokemon.Pokemon}
          </li>
      ))}
    </ul>
        </div>
        <div class="pokemonGIF">
          <Image class="GIFBackground" src={pokemonBackground}/>
          <Image id="test" class="displayGIF" width='inherit'height='500'src=""/>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  var dataCaught;
  {let { data } = await supabase.from('caughtservineatwork').select('kanto')
  dataCaught = data;}
  var friendCaught;
  {let { data } = await supabase.from('jmmartin1229').select('kanto')
  friendCaught = data;}
  var dataKanto;
  {let { data } = await supabase.from('Kanto').select()
  dataKanto = data;}
  var dataJohto;
  {let { data } = await supabase.from('Johto').select()
  dataJohto = data;}
  var dataHoenn;
  {let { data } = await supabase.from('Hoenn').select()
  dataHoenn = data;}
  var dataSinnoh;
  {let { data } = await supabase.from('Sinnoh').select()
  dataSinnoh = data;}
  var dataUnova;
  {let { data } = await supabase.from('Unova').select()
  dataUnova = data;}
  var dataKalos;
  {let { data } = await supabase.from('Kalos').select()
  dataKalos = data;}
  var dataAlola;
  {let { data } = await supabase.from('Alola').select()
  dataAlola = data;}
  var dataGalar;
  {let { data } = await supabase.from('Galar').select()
  dataGalar = data;}
  return {
    props: {
     friendCaught: friendCaught,
     pokemonCaught: dataCaught,
     Johto: dataJohto,
     Kanto: dataKanto,
     Hoenn: dataHoenn,
     Sinnoh: dataSinnoh,
     Unova: dataUnova,
     Kalos: dataKalos,
     Alola: dataAlola,
     Galar: dataGalar
    },
  }
}

export default Home;