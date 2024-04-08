import axios, { AxiosResponse, AxiosError } from 'axios'
import { getBaseUrl } from 'util/getBaseUrl'
import { UserInfo } from 'util/getUserInfo'
const userInfo = UserInfo()
const config = {
  headers: {
    Authorization: `Bearer ${userInfo?.token}`,
  },
}
// Make the addReservation request
const addReservations = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/reservation/addReservation`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('add reservation error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAllReservations = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/reservation/getAllReservations`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('getting reservation error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletReservation = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/reservation/deleteReservation/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('deleting reservation error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getReservationId = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/reservation/getReservationById/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('getting reservation error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const updatetReservation = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/reservation/updateReservation/${id}`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('update reservation error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAllMenuItem = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/menu/getAllMenuItem`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('getting menu item error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const assignFood = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/consumeFood/addConsumerFood`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addReservation error
    console.error('getting menu item error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

export {
  addReservations,
  getAllReservations,
  deletReservation,
  getReservationId,
  updatetReservation,
  getAllMenuItem,
  assignFood,
}
