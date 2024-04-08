import axios, { AxiosResponse, AxiosError } from 'axios'
import { getBaseUrl } from 'util/getBaseUrl'
import { UserInfo } from 'util/getUserInfo'
const userInfo = UserInfo()
const config = {
  headers: {
    Authorization: `Bearer ${userInfo?.token}`,
  },
}
// Make the login request
const login = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/user/login`, {
      email,
      password,
    })
    return response.data // Return the response data
  } catch (error: any) {
    // Handle login error
    console.error('Login error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const registerCustomer = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/user/register`, data)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle login error
    console.error('Registration error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const forgotPass = async (email: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/user/forgotPassword`, {
      email,
    })
    return response.data // Return the response data
  } catch (error: any) {
    // Handle login error
    console.error('ForgotPass error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getAllCustomer = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/user/getAllUser`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle login error
    console.error('Registration error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

export { login, forgotPass, registerCustomer, getAllCustomer }
