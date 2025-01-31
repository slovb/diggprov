export class User {
  name: string
  address: string
  email: string
  telephone: string
  uuid?: string

  constructor(name: string, address: string, email: string, telephone: string, uuid?: string) {
    this.name = name
    this.address = address
    this.email = email
    this.telephone = telephone
    this.uuid = uuid
  }
}
