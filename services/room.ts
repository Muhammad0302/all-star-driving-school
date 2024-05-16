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
const getAllUnAssignStudents = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      // `${getBaseUrl()}/student/getAllUnAssignStudents`,
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

const getAllAssignStudents = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/student/getAllAssignStudents`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletStudent = async (std_id: any, assign_id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/student/deleteStudent?std_id=${std_id}&assign_id=${assign_id}`,
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
    const response: AxiosResponse = await axios.post(`${getBaseUrl()}/assign/add`, data, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('add student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const addlesson = async (id: any, data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/assign/addlesson/${id}`,
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
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/assign/get`, config)
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
      `${getBaseUrl()}/assign/delete/${id}`,
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
      `${getBaseUrl()}/assign/getPackageByStdId/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getAssignByStdId = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/assign/getAssignById/${id}`,
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

const addPayment = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/studnetPayment/add`,
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

const getAllPayment = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/studnetPayment/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletePayment = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/studnetPayment/delete/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const editPayment = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/studnetPayment/update/${id}`,
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

const getAllInstructorStudent = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/assign/getStudentsByInstructor/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getAllStudentInstructor = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/assign/getInstructorsByStudent/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const addInstructorPayment = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/instructorPayment/add`,
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

const getInstructorPayment = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/instructorPayment/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getInstructorPaymentById = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/instructorPayment/getPaymentByInstructorId/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const changeInstructor = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/assign/changeinstructor`,
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

const editAssignInstructor = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/assign/update/${id}`,
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

const addprivatelesson = async (data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${getBaseUrl()}/privateLesson/add`,
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

const getAllPrivateLesson = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/privateLesson/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const deletePrivateLesson = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${getBaseUrl()}/privateLesson/delete/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getRate = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${getBaseUrl()}/rate/get`, config)
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting packages error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const updateRate = async (data: any, id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${getBaseUrl()}/rate/update/${id}`,
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

const getStudentsByInstructorId = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/student/getStudentByInstructorId/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}
const getPaymentByStdId = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/studnetPayment/getPaymentSumByStdId/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getAssignedStudent = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/student/getAssignStudent`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting student error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getSinglePay = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/studnetPayment/getPaymentById/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
    throw error // Throw the error to be caught by the caller
  }
}

const getSingleLesson = async (id: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/lesson/getLessonById/${id}`,
      config,
    )
    return response.data // Return the response data
  } catch (error: any) {
    // Handle addRoom error
    console.error('getting room error:', error.message)
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
  addPayment,
  getAllPayment,
  deletePayment,
  editPayment,
  getAllInstructorStudent,
  getAllStudentInstructor,
  addInstructorPayment,
  getInstructorPayment,
  getInstructorPaymentById,
  changeInstructor,
  getAssignByStdId,
  editAssignInstructor,
  addlesson,
  addprivatelesson,
  getAllPrivateLesson,
  deletePrivateLesson,
  getRate,
  updateRate,
  getAllUnAssignStudents,
  getAllAssignStudents,
  getStudentsByInstructorId,
  getPaymentByStdId,
  getAssignedStudent,
  getSinglePay,
  getSingleLesson,
}
