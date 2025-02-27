import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

// Función para subir la imagen
export async function uploadImage(formData: FormData) {
  try {
    // Obtener la imagen del formData
    const image = formData.get('image')

    // Verificar que la imagen exista y sea un Blob
    if (!image || !(image instanceof Blob)) {
      throw new Error('No image provided or invalid file')
    }

    // Convertir el Blob a un ArrayBuffer y luego a Buffer
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Subir la imagen a Cloudinary directamente desde el Buffer
    const response: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result as UploadApiResponse)
        }
      )

      // Crear un stream de lectura y enviar los datos al uploader
      const stream = new Readable()
      stream.push(buffer)
      stream.push(null) // Señalar el fin del stream
      stream.pipe(uploadStream)
    })

    // Retornar la URL de la imagen subida
    return { url: response.secure_url }
  } catch (error: any) {
    console.error('Error uploading image:', error)
    throw new Error(error.message)
  }
}
