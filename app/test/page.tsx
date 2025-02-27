'use client'

import { appendSheetData } from '@/lib/hooks/products'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string>('')

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const fileArray = Array.from(files)
      setImageFiles(fileArray)

      const previewUrls = fileArray.map(file => URL.createObjectURL(file))
      setPreviewImages(previewUrls)
    }
  }

  const handlePdfSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files[0]) {
      const selectedFile = files[0]

      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.')
        return
      }

      setPdfFile(selectedFile)
      setPdfFileName(selectedFile.name)
    }
  }

  const handleCreateProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    // Recopilar y validar datos del formulario
    const fields = [
      'name',
      'code',
      'category',
      'brand',
      'description',
      'features',
      'stock',
      'cost',
      'price',
      'discountPrice'
    ]

    const productData: Record<string, string> = {}
    for (const field of fields) {
      const value = formData.get(field)?.toString().trim()
      if (!value) {
        alert(`Please fill the field "${field}".`)
        setIsLoading(false)
        return
      }
      productData[field] = value
    }

    if (imageFiles.length === 0) {
      alert('Please upload at least one image.')
      setIsLoading(false)
      return
    }

    if (!pdfFile) {
      alert('Please upload the technical data sheet (PDF).')
      setIsLoading(false)
      return
    }

    try {
      // Subir las imágenes a la API
      const imageFormData = new FormData()
      imageFiles.forEach(file => imageFormData.append('images', file))

      const uploadResponse = await fetch('/api/uploadImage', {
        method: 'POST',
        body: imageFormData
      })

      if (!uploadResponse.ok) {
        throw new Error('Error uploading images')
      }

      const uploadResult = await uploadResponse.json()

      if (!uploadResult.urls || !Array.isArray(uploadResult.urls)) {
        throw new Error('Invalid response from image upload')
      }

      const imageUrls = JSON.stringify([uploadResult.urls.join(',')])

      // Subir el archivo PDF a la API
      const pdfFormData = new FormData()
      pdfFormData.append('file', pdfFile)

      const pdfResponse = await fetch('/api/uploadPdf', {
        method: 'POST',
        body: pdfFormData
      })

      if (!pdfResponse.ok) {
        throw new Error('Error uploading PDF')
      }

      const pdfResult = await pdfResponse.json()
      if (!pdfResult.url) {
        throw new Error('Invalid response from PDF upload')
      }

      const pdfUrl = pdfResult.url
      const id = Math.random().toString(36).substr(2, 9) + Date.now()
      const slug = productData.name.toLowerCase().replace(/\s+/g, '-')

      console.log(slug)

      const newProduct = [
        id,
        productData.name,
        slug,
        productData.code,
        productData.category,
        productData.brand,
        productData.description,
        productData.features,
        productData.stock,
        productData.cost,
        productData.price,
        productData.discountPrice,
        imageUrls,
        pdfUrl
      ]

      // Guardar el producto en la base de datos
      const response = await appendSheetData(newProduct)
      if (response) {
        alert('Product created successfully!')
        setPreviewImages([])
        setImageFiles([])
        setPdfFile(null)
        setPdfFileName('')
      } else {
        throw new Error('Error saving product')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to create product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-0 md:px-6 py-12 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Create Product</h1>

        <form onSubmit={handleCreateProduct}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Code</label>
            <input
              type="text"
              name="code"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <input
              type="text"
              name="category"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Marca</label>
            <input
              type="text"
              name="brand"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <input
              type="text"
              name="description"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Características</label>
            <input
              type="text"
              name="features"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="text"
              name="stock"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Costo</label>
            <input
              type="text"
              name="cost"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="text"
              name="price"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Precio con descuento</label>
            <input
              type="text"
              name="discountPrice"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelection}
              className="mt-1"
              multiple // Permite seleccionar múltiples archivos
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Upload file pdf</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfSelection}
              className="mt-1"
            />
          </div>

          {previewImages.length > 0 && (
            <div className="mt-4">
              <p>Preview Images:</p>
              <div className="flex gap-4 mt-2">
                {previewImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {pdfFile && (
            <div className="mt-4">
              <p>Uploaded PDF: {pdfFileName}</p>
            </div>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Product...' : 'Create Product'}
          </Button>
        </form>
      </div>
    </div>
  )
}
