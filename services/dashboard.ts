import axios, { AxiosResponse } from 'axios'
import { getBaseUrl } from 'util/getBaseUrl'
import { UserInfo } from 'util/getUserInfo'
const userInfo = UserInfo()
const config = {
  headers: {
    Authorization: `Bearer ${userInfo?.token}`,
  },
}
const fetchDashboardData = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${getBaseUrl()}/user/getdashboardstats`,
      config,
    )

    return response.data
  } catch (error: any) {
    console.error('DashboardData error: ', error.message)
    throw error
  }
}

export { fetchDashboardData }
