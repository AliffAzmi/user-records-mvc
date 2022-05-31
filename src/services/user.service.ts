import axios from 'axios'
import { User } from '../models/user.model'
function getUsers (): Promise<User[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        'https://mvc-v1.free.beeceptor.com/users'
      )
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export { getUsers }
