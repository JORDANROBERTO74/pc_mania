'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { productList } from '@/components/fakeData/productList'
import EmptyImage from '@/components/common/icons/EmptyImage'
import useCart from '@/components/useCart'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'

export default function Component() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const productData = productList?.find(
    product => product?.id?.toLowerCase() === productId
  )
  const { addToCart } = useCart()

  const discountPercentage = productData?.discountPrice?.amount
    ? (productData?.discountPrice?.amount * 100) / productData?.price?.amount
    : null

  return (
    <div className="container mx-auto px-0 md:px-6 py-12">
      <div className="flex justify-center w-full">
        <h1 className="text-2xl font-bold mb-6 w-full max-w-[800px]">
          Detalles del Producto
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid gap-8 w-full max-w-[800px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {productData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex justify-center flex-1">
                  <Carousel className="w-full max-w-xs h-[200px] md:h-[300px]">
                    <CarouselContent>
                      {!!productData?.images?.length ? (
                        productData?.images?.map((image, index) => (
                          <CarouselItem key={index}>
                            <Card className="bg-background border-none">
                              <CardContent className="flex items-center justify-center p-0">
                                <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm">
                                  <Image
                                    src={image}
                                    alt={`image-${index}`}
                                    className="h-[200px] md:h-[300px] w-[300px] object-cover rounded-lg"
                                    width={363}
                                    height={100}
                                    priority
                                  />
                                  {!!discountPercentage && (
                                    <Badge className="absolute top-2 right-2 bg-red-500">
                                      -{discountPercentage.toFixed(0)}%
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem>
                          <Card className="bg-background border-none">
                            <CardContent className="flex items-center justify-center p-0">
                              <div>
                                <EmptyImage className="h-[200px] md:h-[300px] w-[200px] md:w-[300px] object-cover rounded-lg" />
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                  </Carousel>
                </div>
                <div className="flex-1 space-y-4">
                  {!!productData ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center gap-1 text-3xl font-bold">
                        <span>
                          {productData?.discountPrice?.currency ||
                            productData?.price?.currency}
                        </span>
                        <span>
                          {productData?.discountPrice?.amount ||
                            productData?.price?.amount}
                        </span>
                      </span>
                      {discountPercentage && (
                        <span className="flex items-center gap-1 text-xl text-muted-foreground line-through">
                          <span>{productData?.price?.currency}</span>
                          <span>{productData?.price?.amount}</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-3xl font-bold">
                      {'Error al cargar el producto'}
                    </p>
                  )}
                  <p className="text-gray-600 font-semibold">
                    {productData?.brand}
                  </p>
                  <p className="text-gray-600">{productData?.description}</p>
                  <Button type="button" variant="outline" className="w-full">
                    <a
                      href={productData?.technicalSpecifications}
                      download
                      className="w-full flex justify-center items-center"
                    >
                      Ver ficha técnica
                    </a>
                  </Button>
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {!!productData && 'Características principales:'}
                    </p>
                    <ul className="text-sm text-gray-600">
                      {productData?.features?.map((feature, index) => (
                        <li className="flex gap-3" key={index}>
                          <span>•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end items-center">
              <div className="flex space-x-2">
                <Button
                  disabled={
                    !productData ||
                    !productData?.stock?.available ||
                    !productData?.stock?.quantity
                  }
                  onClick={() => {
                    addToCart(productData)
                  }}
                  type="button"
                  className="flex items-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {productData?.stock?.available &&
                  !!productData?.stock?.quantity
                    ? 'Añadir al carrito'
                    : 'Agotado'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
