import TokenService from './tokenService';


export default function ConfigService() {
  const { token } = TokenService()
  const config = {
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type'  : 'application/json'
    }
  }

  return config
}