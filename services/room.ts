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
const addRoom = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/room/addRoom`, data, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAllRooms = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/room/getAllRooms`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletRoom = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/room/deleteRoom/${id}`,
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
const editRoom = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/room/updateRoom/${id}`,
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

export { addRoom, getAllRooms, deletRoom, getRoomById, editRoom }
