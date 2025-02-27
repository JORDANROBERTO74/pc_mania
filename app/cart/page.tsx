'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { CartList } from '@/components/context'
import useCart from '@/components/useCart'
import { useRouter } from 'next/navigation'
import { CHECKOUT, PRODUCT } from '@/components/navigation/Constants'
import { MinusIcon, PlusIcon, SearchX, ShoppingCart } from 'lucide-react'
import EmptyImage from '@/components/common/icons/EmptyImage'
import Image from 'next/image'

export default function Component() {
  const router = useRouter()
  const { cartProductList } = React.useContext(CartList)
  const { updateQuantity, removeFromCart } = useCart()

  const total = cartProductList.reduce(
    (acc: any, item: any) => acc + item?.price?.amount * item?.quantity,
    0
  )

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {!cartProductList?.length ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <ShoppingCart className="w-16 h-16" />
          <div className="flex items-center text-muted-foreground">
            <SearchX className="w-5 h-5 mr-2" />
            <p>No hay productos en el carrito</p>
          </div>
          <Button type="button" onClick={() => router.push('/')}>
            Continuar comprando
          </Button>
        </div>
      ) : (
        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cartProductList?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-md overflow-hidden flex items-center flex-col cursor-pointer"
                onClick={() => router.push(`${PRODUCT}?id=${item?.id}`)}
              >
                {!!item?.productImage ? (
                  <div>
                    <Image
                      src={item?.productImage}
                      alt={`product-${index}`}
                      className="h-48 object-cover"
                      width={200}
                      height={200}
                    />
                  </div>
                ) : (
                  <div className="flex">
                    <EmptyImage className="h-48" />
                  </div>
                )}
                <div className="flex flex-col justify-between gap-1 p-4 w-full h-full">
                  <div>
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
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {item?.price?.currency}
                        {item?.price?.amount?.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={event => {
                            event.stopPropagation()
                            updateQuantity(item?.id, item?.quantity - 1)
                          }}
                          disabled={item?.quantity === 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span>{item?.quantity}</span>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={event => {
                            event.stopPropagation()
                            updateQuantity(item?.id, item?.quantity + 1)
                          }}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={event => {
                        event.stopPropagation()
                        removeFromCart(item?.id)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold">
              Total: Bs {total.toFixed(2)}
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-2 w-full md:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/')}
              >
                Continuar comprando
              </Button>
              <Button type="button" onClick={() => router.push(`/${CHECKOUT}`)}>
                Proceder a pagar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
