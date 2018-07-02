const spotifyURI = 'https://accounts.spotify.com/authorize';
const baseURL = 'https://api.spotify.com/v1/';

const clientId="0b77df9e35e54a628655182e529bf087";
const redirectURI='https://clare_app.surge.sh';

let accessToken;

const Spotify = {

  savePlayList(playListName, trackArray) {
    if(playListName && trackArray){
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      let userId = '';

      {/*make a request that returns the user's spotify username, convert the response to JSON and save the response id parameter to the user's ID variable*/}
      return fetch(`${baseURL}me`, {headers: headers}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId=jsonResponse.id;


        {/*use the returned user ID to make a POST request that creates a new playlist in the user's account and returns a playlist ID, use the Spotify playlist endpoints to find a request that creates a new playlist, set the playlist name to the value passed into the method, convert the response t JSON and save the response id parameter to a varibale called playlistID*/}
        {/*you must pass a second arguement that contains an object with parameters for headers, method, and body*/}
        return fetch(`${baseURL}users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playListName})
        }).then(response => response.json()
        ).then(jsonResponse => {
          let playListId = jsonResponse.id;


          {/*use the endpoint that adds tracks to a playlist, set the URIs parameter to an array of track URIs passed into the method. Convert the response to a JSON and save the response id parameter to a variable called playLISTId*/}
          return fetch(`${baseURL}users/${userId}/playlists/${playListId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackArray})
          });
        });
      });
    }
      return;
  },

  getAccessToken(){
    if(accessToken){
      return accessToken;
    };
    /*check the url to see if access token is in the URL, like if it has just been obtained*/
    const isAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const isExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    /*if it has been obtained/ it is in the url */
    if(isAccessToken && isExpiresIn){
      accessToken = isAccessToken[1];
      let expiresIn = Number(isExpiresIn[1]);

      /*clears the parameters from the URL so the app doesnt try grabbing the access token after it has expired*/
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else{
      const authorizeURI= `${spotifyURI}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      /*to redirect a user you must set window.location to the URL above*/
      window.location = authorizeURI;
      return accessToken;
    }
  },

  search(searchTerm){
    /*.search() returns a promise that will eventually resolve to the list of tracks from the search*/

    /*need to pass a second argument to the fetch method, it is an object with one field called headers, which is an object with one authorization property with the user's access token*/

    /*convert the returned response to JSON then map the converted JSON to an array of tracks*/

    /*not sure where the jsonResponse.tracks.items.//// came from */
    const accessToken = Spotify.getAccessToken();
    console.log({accessToken});console.log({accessToken});
    const uriToFetch=`${baseURL}search?type=track&q=${searchTerm}`;

    return fetch(uriToFetch,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
  )
}
}

export default Spotify;
