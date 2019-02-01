const clientID = '7d5fbb983b344897a45595d7875b1b46';
//const clientSecret = 'b7a88ba808594eb59880399a82f61443';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {
  getAccessToken() {
    const currentURL = window.location.href;
    //const tokenREG = /access_token=([^&]*)/
    //const expireREG = /expires_in=([^&]*)/

    if (accessToken === '') {
      let token = currentURL.match(/access_token=([^&]*)/);
      let expires_in = currentURL.match(/expires_in=([^&]*)/);

      if (token > '') {
        accessToken = token[1];
        expires_in = expires_in[1];

        window.setTimeout(() => accessToken = '', expires_in * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    } else {
      return accessToken;
    }
    return accessToken;
  },

  async search(term) {
    let token = this.getAccessToken();
    if (token > '') {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}*&type=track`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
          })
        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse.tracks) {
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }
            });
          }
        } else {
          console.log(response);
        }
        throw new Error('Request failed!');
      } catch (error) {
        console.log(error);
      } //catch
    }
  }, // end async

  saveList (name, tracks) {
    console.log(name);
    console.log(tracks);
    if (name === '') return;
    if (!Array.isArray(tracks)) return;

    const curAccessToken = accessToken;
    const spotHeaders = {
      Authorization: `Bearer ${curAccessToken}`
    }
    let userID = null;
    let playlistID = null;

    const xhr = new XMLHttpRequest();
    let url = 'https://api.spotify.com/v1/me';

    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        userID = xhr.response.id;

        const xhr2 = new XMLHttpRequest();
        url = `https://api.spotify.com/v1/users/${userID}/playlists`
        xhr2.responseType = 'json';
        xhr2.onreadystatechange = () => {
          if (xhr2.readyState === XMLHttpRequest.DONE) {
            playlistID = xhr2.response.id;

            const xhr3 = new XMLHttpRequest();
            url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            xhr3.responseType = 'json';
            xhr3.onreadystatechange = () => {
              if (xhr3.readyState === XMLHttpRequest.DONE) {
                return;
              }
            }
            xhr3.open('POST', url);
            xhr3.setRequestHeader('Authorization', `Bearer ${curAccessToken}`)
            xhr3.setRequestHeader('Content-type', 'application/json')
            let data = JSON.stringify({uris: tracks});
            xhr3.send(data);
          }
        }
        xhr2.open('POST', url);
        xhr2.setRequestHeader('Authorization', `Bearer ${curAccessToken}`)
        xhr2.setRequestHeader('Content-type', 'application/json')
        let data = JSON.stringify({name: name});
        xhr2.send(data);
      }
    }
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Bearer ${curAccessToken}`)
    xhr.send();
  },

}

export default Spotify;
