/**
 * Represents a User
 */
export class User {
  name: string
  address: string
  email: string
  telephone: string
  uuid: string

  constructor(name: string, address: string, email: string, telephone: string, uuid: string) {
    this.name = name
    this.address = address
    this.email = email
    this.telephone = telephone
    this.uuid = uuid
  }
}

/**
 * Comparison function for User objects, sorted by ascending (name, address) order
 *
 * @param a
 * @param b
 * @returns -1 if a < b, 1 if a > b, 0 otherwise
 */
export function userComparison(a: User, b: User) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  if (a.address < b.address) {
    return -1
  }
  if (a.address > b.address) {
    return 1
  }
  return 0
}
