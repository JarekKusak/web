import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL  } from "../../../lib/spotify"

// voláno při vypršení tokenu 
async function refreshAccessToken(token){
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const {body: refreshedToken} = await spotifyApi.refreshAccessToken(); // posíláme nový refreshnutý token zpět Spotify API
    console.log("REFRESHED TOKEN IS", refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // údaj o vypršení nového tokenu
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // pokud existuje refresh token, tak ho použijeme, jinak použij token.refreshToken (refresh token nikdy nekončí, ale pro jistotu)
    }
  }
  catch(error){ // při chybě refreshu tokenu
    console.error(error);
    return{
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // konfigurace jednoho nebo více providerů autentizace (pole), v tomhle případě Spotify providera
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID, // enviroment proměnná, keep tracking of secret things, nebudou v GIT repo => envlocalfile
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL, // autorizace (lib/spotify.js)
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login' // custom login stránka
  },
  callbacks: { // funkce ošetřující přihlašování a odhlašování (kontrola platnosti access tokenů)
    // parametry přijímá ze Spotify API
    async jwt({ token, account, user }){
      // počáteční sign in
      if (account && user){
        return {
          ...token, // standartní token
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // proměnná pro vyprchání tokenu po hodině
          // v milisekundách
        }
      }
      // navrátí již existující token při jeho platnosti
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTUJÍCÍ ACCESS TOKEN JE PLATNÝ");
        return token;
      }

      // access token vypršel, je nutno ho refreshnout
      console.log("TOKEN VYPRŠEL, REFRESHING...");
      return await refreshAccessToken(token);
    },

    async session({ session, token }){
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  },
});