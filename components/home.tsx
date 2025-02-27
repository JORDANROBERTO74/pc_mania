'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { productList } from './fakeData/productList'
import useCart from './useCart'
import EmptyImage from './common/icons/EmptyImage'
import { useRouter } from 'next/navigation'
import { PRODUCT } from './navigation/Constants'
import { SearchX, X } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { SearchValue } from './context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Filter } from 'lucide-react'

export default function ProductCatalog() {
  const router = useRouter()
  const { value } = React.useContext(SearchValue)
  const [categoryFilter, setCategoryFilter] = React.useState('todos')
  const [priceFilter, setPriceFilter] = React.useState('default')
  const { addToCart } = useCart()

  const productListFiltered = productList
    ?.filter(obj => {
      const search = !!value
        ? obj?.name?.toLowerCase().includes(value.toLowerCase()) ||
          obj?.slug?.toLowerCase().includes(value.toLowerCase()) ||
          obj?.brand?.toLowerCase().includes(value.toLowerCase()) ||
          obj?.category?.toLowerCase().includes(value.toLowerCase())
        : obj
      return search
    })
    ?.filter(obj => {
      return categoryFilter !== 'todos'
        ? obj?.category === categoryFilter
        : true
    })
    ?.sort((a, b) => {
      if (priceFilter === 'price_asc') {
        return (
          (a.discountPrice?.amount || a.price?.amount) -
          (b.discountPrice?.amount || b.price?.amount)
        )
      }
      if (priceFilter === 'price_desc') {
        return (
          (b.discountPrice?.amount || b.price?.amount) -
          (a.discountPrice?.amount || a.price?.amount)
        )
      }
      return 0
    })

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-6">
        <h1 className="hidden md:block text-2xl font-bold">
          {!!value
            ? `Buscando "${value}" (${productListFiltered?.length})`
            : `Nuestros Productos (${productListFiltered?.length})`}
        </h1>
        <h1 className="block md:hidden text-2xl font-bold">
          {!!value ? `Buscando "${value}"` : `Nuestros Productos`}
        </h1>
        <div className="flex w-full flex-1 flex-col flex-col-reverse md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex w-full flex-col md:flex-row items-start md:items-center gap-2">
            {categoryFilter !== 'todos' && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-sm"
              >
                <Filter className="h-3 w-3" />
                {categoryFilter}
                <div
                  onClick={() => setCategoryFilter('todos')}
                  className="flex items-center justify-center p-1 rounded-sm cursor-pointer hover:border hover:border-gray-300"
                >
                  <X className="h-3 w-3" />
                </div>
              </Badge>
            )}
            {priceFilter !== 'default' && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-sm"
              >
                <Filter className="h-3 w-3" />
                {priceFilter === 'price_asc'
                  ? 'Precio: Menor a Mayor'
                  : 'Precio: Mayor a Menor'}
                <div
                  onClick={() => setPriceFilter('default')}
                  className="flex items-center justify-center p-1 rounded-sm cursor-pointer hover:border hover:border-gray-300"
                >
                  <X className="h-3 w-3" />
                </div>
              </Badge>
            )}
          </div>
          <div className="flex w-full md:w-auto items-center justify-between gap-2">
            <div className="block md:hidden text-base text-muted-foreground">
              {`Productos: ${productListFiltered?.length}`}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={categoryFilter}
                  onValueChange={value => setCategoryFilter(value)}
                >
                  <DropdownMenuRadioItem value="todos">
                    Todas las categorías
                  </DropdownMenuRadioItem>
                  {Array.from(
                    new Set(productList?.map(obj => obj?.category))
                  ).map(category => (
                    <DropdownMenuRadioItem key={category} value={category}>
                      {category}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={priceFilter}
                  onValueChange={value => setPriceFilter(value)}
                >
                  <DropdownMenuRadioItem value="default">
                    Ordenar por defecto
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price_asc">
                    Precio: Menor a Mayor
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price_desc">
                    Precio: Mayor a Menor
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {!productListFiltered?.length ? (
        <div className="flex items-center justify-center text-muted-foreground">
          <SearchX className="w-5 h-5 mr-2" />
          <p>No se encontraron resultados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {productListFiltered?.map((product: any, index: number) => {
            const discountPercentage = product?.discountPrice?.amount
              ? (product?.discountPrice?.amount * 100) / product?.price?.amount
              : null
            return (
              <div
                key={product?.id}
                className="relative bg-card rounded-lg shadow-md overflow-hidden flex items-center flex-col cursor-pointer"
                onClick={() => router.push(`${PRODUCT}?id=${product?.id}`)}
              >
                {!!product?.productImage ? (
                  <div className="rounded-lg">
                    <Image
                      src={product?.productImage}
                      alt={`product-${index}`}
                      className="h-48 w-auto object-cover"
                      width={200}
                      height={200}
                      priority
                    />
                    {!!discountPercentage && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        -{discountPercentage.toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex">
                    <EmptyImage className="h-48" />
                  </div>
                )}
                <div className="flex flex-col justify-between gap-1 p-4 w-full h-full">
                  <div>
                    <h3
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
                    </h3>
                    <h2
                      className="text-lg font-semibold"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        WebkitLineClamp: 2
                      }}
                    >
                      {product?.name}
                    </h2>
                  </div>
                  <div>
                    <div className="text-primary flex items-center gap-2">
                      <span className="flex items-center gap-1 text-lg font-bold">
                        <span>
                          {product?.discountPrice?.currency ||
                            product?.price?.currency}
                        </span>
                        <span>
                          {product?.discountPrice?.amount ||
                            product?.price?.amount}
                        </span>
                      </span>
                      {discountPercentage && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground line-through">
                          <span>{product?.price?.currency}</span>
                          <span>{product?.price?.amount}</span>
                        </span>
                      )}
                    </div>
                    <Button
                      disabled={
                        !product?.stock?.available || !product?.stock?.quantity
                      }
                      onClick={event => {
                        event.stopPropagation()
                        addToCart(product)
                      }}
                      type="button"
                      className="w-full mt-4"
                    >
                      {product?.stock?.available && !!product?.stock?.quantity
                        ? 'Añadir al carrito'
                        : 'Agotado'}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
