// 这个js文件就是用于管理各种接口地址的
import Network from './network'
// 0: pc
//
// 1: android
//
// 2: iphone
//
// 3: ipad
// export const getBanner = () => Network.get('/banner?type=2')
export const getBanner = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    Network.get('/tabledata', data)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}
export const getUser = (data) => Network.get('/user', data)
export const getLogin = (data) => Network.post('/login', data)
export const getRegister = (data) => Network.post('/register', data)
export const getAdduser = (data) => Network.post('/adduser', data)
export const getTableName = () => Network.get('/table_name')
export const getUserdata = () => Network.get('/userdata')
export const getVideodata = () => Network.get('/videodata')
export const getOrderdata = () => Network.get('/orderdata')
export const getDate = () => Network.get('/date')
export const getCommodity = (data) => Network.get('/commodity/data', data)
export const getCommodityCount = (data) => Network.get('/commodity/count', data)
export const getCommodityIncrease = (data) => Network.get('/commodity/increase', data)
export const getCommodityDelete = (data) => Network.get('/commodity/delete', data)
export const getUserDelete = (data) => Network.get('/user/delete', data)
export const getCommodityRevise = (data) => Network.get('/commodity/revise', data)
export const getUserUpdata = (data) => Network.get('/user/updata', data)
export const getUserUpdataPower = (data) => Network.get('/user/updataPower', data)
export const getCommoditySearch = (data) => Network.get('/commodity/search', data)
export const getUserSearch = (data) => Network.get('/user/search', data)
export const getPost = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    // console.log(data)
    Network.post('/api/register/login', data)
      .then(function (result) {
        // resolve(result.artists)
        // console.log('1234')
        console.log(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}

export const getPostin = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    // console.log(data)
    Network.post('/api/register/re', data)
      .then(function (result) {
        // resolve(result.artists)
        // console.log('1234')
        console.log(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}
