import { User } from './models/user'

const API_URL = import.meta.env.VITE_API_URL

/**
 *
 */
function parseUser(entry: any): User {
  return new User(
    entry.name ?? '',
    entry.address ?? '',
    entry.email ?? '',
    entry.telephone ?? '',
    entry.uuid ?? '',
  )
}

/**
 * Send a GET request to the API, interpret the data and return it
 *
 * @return the users
 */
export async function getUsers(): Promise<User[]> {
  const url = new URL(API_URL)
  const response = await fetch(url)
  if (response.status !== 200) {
    throw new Error('Unable to get users')
  }

  const obj = await response.json()

  // const newUsers = obj as User[]
  const users: User[] = []
  if (Array.isArray(obj)) {
    for (const key in obj) {
      users.push(parseUser(obj[key]))
    }
  } else {
    throw new Error('Unexpected format')
  }

  return users
}

/**
 * Send a GET request to API/uuid, interpret the data and return it
 *
 * @return the user if found, otherwise undefined
 */
export async function getUser(uuid: string): Promise<User | undefined> {
  const url = new URL(API_URL + '/' + uuid)
  const response = await fetch(url) // TODO: Safely build url
  if (response.status === 404) {
    return undefined
  } else if (response.status !== 200) {
    throw new Error('Unable to get user: ' + uuid)
  }

  const obj = await response.json()
  return parseUser(obj)
}

/**
 * Send a POST request with the user data to the backend trying to create a user, recieves uuid.
 *
 * @param name
 * @param address
 * @param email
 * @param telephone
 * @returns the created users uuid
 */
export async function createUser(
  name: string,
  address: string,
  email: string,
  telephone: string,
): Promise<string> {
  const url = new URL(API_URL)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      address: address,
      email: email,
      telephone: telephone,
    }),
  })

  // extract the uuid
  if (response.status == 201) {
    const location = response.headers.get('Location')
    const parts = location?.split('/')
    const uuid = parts?.pop()
    if (uuid === undefined) {
      throw new Error('Got empty UUID from backend')
    }
    return uuid
  } else if (response.status == 400) {
    throw new Error('Bad request, did you forget a parameter?')
  } else if (response.status == 403) {
    throw new Error('User already exists')
  } else {
    throw new Error('Unknown cause')
  }
}

/**
 *
 * @param user
 */
export async function deleteUser(user: User) {
  const url = new URL(API_URL + '/' + user.uuid)
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  if (response.status !== 200) {
    throw new Error('Unable to delete')
  }
}

/**
 *
 * @param user
 */
export async function putUser(user: User): Promise<void> {
  const url = new URL(API_URL + '/' + user.uuid)
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      address: user.address,
      email: user.email,
      telephone: user.telephone,
    }),
  })
  if (response.status !== 200) {
    throw new Error('Unable to update')
  }
}
