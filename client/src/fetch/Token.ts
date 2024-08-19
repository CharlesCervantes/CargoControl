
export function getAuthorizationHeader(): Record<string, string> {
  const authToken = localStorage.getItem('authToken')
  return {
    authorization: `Bearer ${authToken}`,
  }
}
