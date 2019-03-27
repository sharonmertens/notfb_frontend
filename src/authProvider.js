import {AUTH_LOGIN} from 'react-admin'

export default (type, params) => {
  if(type === AUTH_LOGIN) {
    const {username, password} = params
    const request = new Request('https://notfb.herokuapp.com/authenticate', {
      method: 'POST',
      boyd: JSON.stringify({username, password}),
      headers: new Headers({'Content-Type: 'application/json})
    })
    return fetch(request)
      .then(response => {
      if(response.status < 200 || response.status >= 300) {
        thorw new Error(response.statusText)
      }
      return response.json()
    })
    .then(({token}) => {
      localStorage.setItem('token', token)
    })
  }
  return Promise.resolve()
}
