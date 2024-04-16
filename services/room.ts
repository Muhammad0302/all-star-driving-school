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

const addStudent = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/student/addStudent`,
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

const getAllStudents = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/student/getAllStudents`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletStudent = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/student/deleteStudent/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getStudentById = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/student/getStudentById/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const editStudent = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/student/updateStudent/${id}`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('update student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getAllPackages = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/package/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting packages error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const editPackges = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/package/update/${id}`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('update package error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getPackageById = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/package/getById/${id}`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const deletPackage = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/package/delete/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting package error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const addPackage = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/package/add`, data, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const assignPackage = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/packageAssigToStud/add`,
      data,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAllAssignPackage = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/packageAssigToStud/get`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletAssignPackage = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/packageAssigToStud/delete/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getPackageByStdId = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/packageAssigToStud/getPackageByStdId/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const addLessonCompletion = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/lesson/add`, data, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getAllCompletedLesson = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/lesson/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deleteCompletedLesson = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/lesson/delete/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

export {
  addInstructor,
  getAllInstructors,
  deletInstructor,
  editInstructor,
  getInstructorById,
  addStudent,
  getAllStudents,
  deletStudent,
  getStudentById,
  editStudent,
  getAllPackages,
  editPackges,
  getPackageById,
  deletPackage,
  addPackage,
  assignPackage,
  getAllAssignPackage,
  deletAssignPackage,
  getPackageByStdId,
  addLessonCompletion,
  getAllCompletedLesson,
  deleteCompletedLesson,
}
