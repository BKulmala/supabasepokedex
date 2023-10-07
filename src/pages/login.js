import { useEffect } from 'react';

function mainPage() {
  return (
  <>
<a id="login" href="https://atsjxnlexphneggbwgbb.supabase.co/auth/v1/callback">Identify Yourself</a>
	{useEffect (() => {window.onload = () => {
		const fragment = new URLSearchParams(window.location.hash.slice(1));
		const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

		if (!accessToken) {
			return (document.getElementById('login').style.display = 'block');
		}

		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${tokenType} ${accessToken}`,
			},
		})
			.then(result => result.json())
			.then(response => {
				const { username, discriminator } = response;
				document.getElementById('info').innerText += ` ${username}#${discriminator}`;
			})
			.catch(console.error);
	}})}
</>
)
}
export default mainPage