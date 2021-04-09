import { User } from '../Interfaces'

export const FetchPost = async (
  url: string,
  data: User
): Promise<{ ok: boolean }> => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await (await response).json()

  return result
}
