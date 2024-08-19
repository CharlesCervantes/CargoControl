// Función para convertir una imagen en formato Base64 a un Blob
export function base64ToBlob(base64String: string): Blob {
  // Crear un Blob a partir del Base64
  const byteCharacters = atob(base64String.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++)
    byteNumbers[i] = byteCharacters.charCodeAt(i)

  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'image/png' })

  return blob
}
