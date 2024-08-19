import { connection } from '../../env'
// actulizado
export const updateUserToken = async(id: string, token: string) => {
  try {
    const data = {
      token,
    }
    const request = await fetch(`${connection}/user/token/${id}`, {
      method: 'PATCH',
      headers: {
        // ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseBody = await request.json()
    console.log('responseBody:', responseBody)
    // if (responseBody.ok) {
    //   toast.success(responseBody.message, {
    //     duration: 3000,
    //     position: 'top-center',
    //   })
    // } else {
    //   toast.error(responseBody.message, {
    //     duration: 3000,
    //     position: 'top-center',
    //   })
    // }
    return responseBody
  } catch (error) {
    console.log('Error:', error)
  }
}
