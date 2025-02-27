'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CartList } from '@/components/context'
import EmptyImage from '@/components/common/icons/EmptyImage'
import { CHECKOUT, PRODUCT } from '@/components/navigation/Constants'
import { Spinner } from '@/components/ui/spinner'
import { SearchX, ShoppingCart } from 'lucide-react'
import { storeData } from '../../components/fakeData/storeData'
import Image from 'next/image'

export default function Component() {
  const router = useRouter()
  const { cartProductList } = React.useContext(CartList)
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  const subTotal = cartProductList.reduce(
    (acc: any, item: any) => acc + item?.price?.amount * item?.quantity,
    0
  )

  const taxPercentage = 0
  const tax = subTotal * (taxPercentage / 100)
  const total = subTotal + tax

  const handleCheckout = () => {
    const productDetails =
      cartProductList
        ?.map(
          (item: { quantity: any; price: { amount: any }; name: any }) =>
            `• ${item?.quantity}x - Bs ${item?.price?.amount}. ${item?.name}`
        )
        .join('%0A') || ''
    const totalItems = cartProductList.reduce(
      (acc: number, item: any) => acc + item?.quantity,
      0
    )

    const message = `
*Pedido%20PCMania*%0A%0AProductos%20(${totalItems}):%0A-----%0A${productDetails}%0A-----%0A%0ASubtotal%3A%20Bs%20${subTotal.toFixed(
      2
    )}%0ADescuentos%3A%20Bs%20${Number(0).toFixed(
      2
    )}%0AImpuestos%3A%20Bs%20${tax.toFixed(
      2
    )}%0A%0A*Total%20del%20pedido%3A%20Bs%20${total.toFixed(2)}*
`.trim()

    const formatPhoneNumber = (phone: string): string => {
      const match = phone.match(/\d{3}/)
      const countryCode = match ? match[0] : ''
      const cleanedNumber = phone.replace(/\D/g, '')
      return countryCode + cleanedNumber.slice(countryCode.length)
    }

    const phone = formatPhoneNumber(storeData?.contact?.phone)

    const whatsappUrl = `https://wa.me/${phone}/?text=${message}`

    window.open(whatsappUrl, '_blank')
    setIsRedirecting(false)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-center w-full">
        <h1 className="text-2xl font-bold mb-6 w-full max-w-[800px]">
          Checkout
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid gap-8 w-full max-w-[800px]">
          <div className="grid gap-6">
            {!cartProductList?.length ? (
              <div className="bg-card md:rounded-lg md:shadow-md overflow-hidden p-0 md:p-6 w-full">
                <div className="flex items-center justify-center pb-5">
                  <ShoppingCart className="w-16 h-16" />
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <SearchX className="w-5 h-5 mr-2" />
                  <p>No hay productos en el carrito</p>
                </div>
              </div>
            ) : (
              <div className="bg-card md:rounded-lg md:shadow-md overflow-hidden p-0 md:p-6">
                <div className="grid gap-4">
                  {cartProductList?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => router.push(`${PRODUCT}?id=${item?.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        {!!item?.productImage ? (
                          <Image
                            src={item?.productImage}
                            alt={`product-${index}`}
                            className="h-16 md:h-24 w-16 md:w-24 object-cover"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="flex w-16 md:w-24 h-16 md:h-24 items-center">
                            <EmptyImage className="h-16 md:h-24 object-cover" />
                          </div>
                        )}
                        <div>
                          <h3
                            className="font-semibold"
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box',
                              WebkitLineClamp: 2
                            }}
                          >
                            {item?.name}
                          </h3>
                          <h2
                            className="text-sm text-gray-600 font-semibold"
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box',
                              WebkitLineClamp: 1
                            }}
                          >
                            {item?.slug}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-semibold">
                        {item?.price?.currency}
                        {item?.price?.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      Bs {subTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Descuentos</span>
                    <span className="font-semibold">
                      Bs {Number(0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span className="font-semibold">Bs {tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      Bs {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-card md:rounded-lg md:shadow-md overflow-hidden p-0 md:p-6 mt-6 md:mt-0 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Completar compra</h2>
            <p className="text-muted-foreground">
              Revisa tu pedido y completa la compra.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                size="lg"
                disabled={!cartProductList?.length}
                onClick={() => {
                  setIsRedirecting(true)
                  handleCheckout()
                }}
              >
                {isRedirecting ? <Spinner /> : 'Pagar'}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() =>
                  router.push(`/${cartProductList?.length ? CHECKOUT : ''}`)
                }
              >
                {!!cartProductList?.length
                  ? 'Volver al carrito'
                  : 'Continuar comprando'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
