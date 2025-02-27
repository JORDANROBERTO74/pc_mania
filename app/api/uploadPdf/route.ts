// app/api/uploadPdf/route.ts
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
    const file = data.get('file') // Obtener el archivo del formulario

    // Verificar que el archivo es un Blob válido
    if (!file || !(file instanceof Blob)) {
      return new Response(
        JSON.stringify({ error: 'No file provided or invalid file type' }),
        { status: 400 }
      )
    }

    // Validar que sea un archivo PDF
    if (file.type !== 'application/pdf') {
      return new Response(
        JSON.stringify({ error: 'Only PDF files are allowed' }),
        { status: 400 }
      )
    }

    // Convertir el archivo en un buffer para el stream
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Subir el archivo PDF a Cloudinary
    const uploadPromise = new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads/pdf', resource_type: 'auto' },
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

    const response = await uploadPromise

    // Retornar la URL del archivo PDF subido
    return new Response(JSON.stringify({ url: response.secure_url }), {
      status: 200
    })
  } catch (error: any) {
    console.error('Error uploading PDF:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    })
  }
}
