import axios, { AxiosResponse, AxiosError } from 'axios'
import { getBaseUrl } from 'util/getBaseUrl'
import { UserInfo } from 'util/getUserInfo'
const userInfo = UserInfo()
const config = {
  headers: {
    Authorization: `Bearer ${userInfo?.token}`,
  },
}
// Make the addRoom request
const addInstructor = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/instructor/addinstructor`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAllInstructors = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/instructor/getallinstructors`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletInstructor = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/instructor/deleteinstructor/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getInstructorById = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/instructor/getsingleinstructor/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getRoomById = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/room/getroombyid/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const editInstructor = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/instructor/updateinstructor/${id}`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('update room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

export {
  addInstructor,
  getAllInstructors,
  deletInstructor,
  getRoomById,
  editInstructor,
  getInstructorById,
}
