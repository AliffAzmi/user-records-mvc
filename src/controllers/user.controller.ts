import React from 'react'
import { User } from '../models/user.model'
import { getUsers } from '../services/user.service'
import { useStore } from '../services/store'

function getUserList () {
  return getUsers().then(data => {
    return data
  })
}

export { getUserList }
