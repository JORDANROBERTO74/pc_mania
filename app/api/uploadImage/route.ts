// app/api/uploadImage/route.ts
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const images = data.getAll('images') // Obtener todas las imágenes

    // Verificar que al menos haya una imagen
    if (images.length === 0 || images.some(image => !(image instanceof Blob))) {
      return new Response(
        JSON.stringify({ error: 'No images provided or invalid files' }),
        { status: 400 }
      )
    }

    // Subir todas las imágenes a Cloudinary
    const uploadPromises = images.map(async image => {
      // Ensure image is a Blob/File before calling arrayBuffer()
      if (!(image instanceof Blob)) {
        throw new Error('Invalid file type')
      }
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads/images' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result as UploadApiResponse)
          }
        )

        const stream = new Readable()
        stream.push(buffer)
        stream.push(null) // Señalar el fin del stream
        stream.pipe(uploadStream)
      })
    })

    // Esperar a que todas las imágenes se suban
    const responses = await Promise.all(uploadPromises)

    // Retornar las URLs de todas las imágenes subidas
    const imageUrls = responses.map(response => response.secure_url)
    return new Response(JSON.stringify({ urls: imageUrls }), {
      status: 200
    })
  } catch (error: any) {
    console.error('Error uploading images:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    })
  }
}
