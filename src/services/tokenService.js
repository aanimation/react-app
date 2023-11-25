import { useState } from 'react';


export default function TokenService() {
  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if (userToken !== undefined) {
      sessionStorage.setItem('token', userToken);
      setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token
  }
}