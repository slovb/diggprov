import { User } from './models/user'

const API_URL = new URL(import.meta.env.VITE_API_ENDPOINT, window.location.origin)

/**
 * Parse an object and interpret it as a user
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseUser(entry: any): User {
  // TODO: Write a neater solution so linting is not disabled
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
  const url = API_URL
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
  const url = new URL(uuid, API_URL)
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
  const url = API_URL
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
 * Send DELETE request to the api with the uuid of the given user
 *
 * @param user
 */
export async function deleteUser(user: User) {
  const url = new URL(user.uuid, API_URL)
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
 * Send PUT request to the api with the uuid of the given user
 *
 * @param user
 */
export async function putUser(user: User): Promise<void> {
  const url = new URL(user.uuid, API_URL)
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
    // TODO: Fix bug, 201 is a valid status that will not happen unless multiple simultaneous users so I am not rebuilding the project to fix it now
    throw new Error('Unable to update')
  }
}
