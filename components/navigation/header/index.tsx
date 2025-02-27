'use client'

import React from 'react'
import { Separator } from '../../ui/separator'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Info,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Trash,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CartList, SearchValue } from '@/components/context'
import useCart from '@/components/useCart'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import Link from 'next/link'
import { ABOUT_US, CART, PRODUCT } from '../Constants'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import EmptyImage from '@/components/common/icons/EmptyImage'
import CartIcon from '@/components/common/icons/CartIcon'
import Image from 'next/image'
import { storeData } from '@/components/fakeData/storeData'

export const Header: React.FC = () => {
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const { setValue } = React.useContext(SearchValue)
  const [inputValue, setInputValue] = React.useState('')
  const [isPopoverMobileOpen, setIsPopoverMobileOpen] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const { cartProductList } = React.useContext(CartList)
  const productCartLength = cartProductList?.reduce(
    (sum: any, product: any) => sum + product?.quantity,
    0
  )
  const { updateQuantity, removeFromCart } = useCart()

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.key === 'Enter') {
      setValue(value)
    }
  }

  const searchMobile = (value: string) => {
    setValue(value)
    setIsPopoverMobileOpen(false)
  }

  const handleReset = () => {
    setInputValue('')
    setValue('')
    setIsPopoverMobileOpen(false)
  }

  return (
    <header className="fixed top-0 z-10 bg-background border-b w-full">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div
          onClick={() => {
            router.push('/')
            setValue('')
          }}
          className="text-2xl font-bold cursor-pointer"
        >
          <Image
            src={'/logotipo.png'}
            alt="logo"
            width={200}
            height={200}
            className="w-auto h-10"
          />
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button
            type="button"
            variant={'link'}
            size={'sm'}
            className="text-foreground hover:text-primary"
            onClick={() => router.push(`/`)}
          >
            Productos
          </Button>
          <Button
            type="button"
            variant={'link'}
            size={'sm'}
            className="text-foreground hover:text-primary"
            onClick={() => router.push(`/${CART}`)}
          >
            Carrito
          </Button>
          <Button
            type="button"
            variant={'link'}
            size={'sm'}
            className="text-foreground hover:text-primary"
            onClick={() => router.push(`/${ABOUT_US}`)}
          >
            Acerca de nosotros
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              `hidden md:flex h-10 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${
                isSearchFocused && 'outline-none ring-2 ring-ring ring-offset-2'
              } items-center`
            )}
          >
            <div className="flex items-center justify-center pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <div className="relative flex-1">
              <Input
                placeholder="Buscar..."
                className="h-[38px] border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={e => handleKeyDown(e, inputValue)}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
              {inputValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleReset}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Popover
            open={isPopoverMobileOpen}
            onOpenChange={setIsPopoverMobileOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[100vw]">
              <div className="flex flex-col gap-5">
                <div
                  className={cn(
                    `flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${
                      isSearchFocused &&
                      'outline-none ring-2 ring-ring ring-offset-2'
                    } items-center`
                  )}
                >
                  <div className="flex items-center justify-center pl-3 text-muted-foreground">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Buscar..."
                      className="h-[38px] border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                    />
                    {inputValue && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleReset}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => searchMobile(inputValue)}
                  type="button"
                  className="w-full"
                >
                  Buscar
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="relative md:hidden inline-block">
            <Button
              onClick={() => router.push(`/${CART}`)}
              variant={'ghost'}
              size={'icon'}
              type="button"
            >
              <CartIcon />
            </Button>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-secondary rounded-full transform -translate-y-1/2">
              {productCartLength}
            </span>
          </div>
          {!!productCartLength ? (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger className="hidden md:flex" asChild>
                <div className="relative inline-block">
                  <Button variant={'ghost'} size={'icon'} type="button">
                    <CartIcon />
                  </Button>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform -translate-y-1/2">
                    {productCartLength}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[500px]">
                <div>
                  <div className="flex gap-1 mb-2 font-semibold">
                    <span>Carrito</span>
                    <span>{`(${productCartLength})`}</span>
                  </div>
                  <div className="h-full max-h-[376px] overflow-auto">
                    {cartProductList?.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-[100px_1fr_auto] items-center gap-4 cursor-pointer my-3"
                        onClick={() => {
                          router.push(`${PRODUCT}?id=${product?.id}`)
                          setIsPopoverOpen(false)
                        }}
                      >
                        {!!product?.productImage ? (
                          <Image
                            src={product?.productImage}
                            alt={`product-${index}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                            style={{
                              aspectRatio: '100/100',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div className="flex">
                            <EmptyImage className="h-[80px]" />
                          </div>
                        )}
                        <div className="grid gap-1">
                          <div className="grid">
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
                              {product?.name}
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
                              {product?.slug}
                            </h2>
                          </div>
                          <div className="flex items-center gap-2">
                            {product?.quantity === 1 ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                onClick={event => {
                                  event.stopPropagation()
                                  removeFromCart(product?.id)
                                }}
                              >
                                <Trash className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                onClick={event => {
                                  event.stopPropagation()
                                  updateQuantity(
                                    product?.id,
                                    product?.quantity - 1
                                  )
                                }}
                              >
                                -
                              </Button>
                            )}

                            <span>{product?.quantity}</span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={event => {
                                event.stopPropagation()
                                updateQuantity(
                                  product?.id,
                                  product?.quantity + 1
                                )
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="text-right font-semibold">
                          {product?.price?.currency}
                          {(product?.price?.amount * product?.quantity).toFixed(
                            2
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-5" />
                  <Button
                    onClick={() => {
                      router.push(`/${CART}`)
                      setIsPopoverOpen(false)
                    }}
                    type="button"
                    className="w-full"
                  >
                    Ir a carrito
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="hidden md:flex">
              <Button
                onClick={() => router.push(`/${CART}`)}
                variant={'ghost'}
                size={'icon'}
                type="button"
              >
                <CartIcon />
              </Button>
            </div>
          )}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <Button
                  type="button"
                  variant={'secondary'}
                  size={'sm'}
                  onClick={() => {
                    setIsSheetOpen(false)
                    router.push(`/`)
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Productos
                </Button>
                <Button
                  type="button"
                  variant={'secondary'}
                  size={'sm'}
                  onClick={() => {
                    setIsSheetOpen(false)
                    router.push(`/${CART}`)
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito
                </Button>
                <Button
                  type="button"
                  variant={'secondary'}
                  size={'sm'}
                  onClick={() => {
                    setIsSheetOpen(false)
                    router.push(`/${ABOUT_US}`)
                  }}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Acerca de nosotros
                </Button>
              </div>
              <SheetFooter />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
