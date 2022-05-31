type UniqueId = number

export interface UserObjs {
  id: UniqueId
  name: string
  phone: string
  email: string
  nric: string
  deceased: boolean
  // isActive: boolean
}

export class User {
  public id: UniqueId
  public name: string
  public phone: string
  public email: string
  public nric: string
  public deceased: boolean

  constructor (
    { id, name, phone, email, nric, deceased }: UserObjs = {
      id: 0,
      name: '',
      phone: '',
      email: '',
      nric: '',
      deceased: false
    }
  ) {
    this.id = id
    this.name = name
    this.phone = phone
    this.email = email
    this.nric = nric
    this.deceased = deceased
  }
}
