/** 
 * api接口的统一封装
 */
import axiosObj from '@/api/axios';
let axios = axiosObj.axios;

//登录管理
const login = {

}
//用户管理
const user = {
  getUserList(params) {
    return axios.get('/user', { params })
  }
}
export default {
  login,
  user
}