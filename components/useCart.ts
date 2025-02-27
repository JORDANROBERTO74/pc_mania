import React from 'react'
import { useToast } from '@/components/ui/use-toast' // Asegúrate de importar el hook correctamente
import { CartList } from '@/components/context' // Asegúrate de importar el contexto correctamente

const useCart = () => {
  const { cartProductList, setCartProductList } = React.useContext(CartList)
  const { toast } = useToast()

  React.useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as any[]
    setCartProductList(savedCart) // Actualiza el contexto con los productos guardados en el localStorage
  }, [setCartProductList])

  const addToCart = (product: any) => {
    try {
      const existingProductIndex = cartProductList.findIndex(
        (item: any) => item.id === product.id
      )
      let updatedCart

      if (existingProductIndex >= 0) {
        // Si el producto ya existe, actualiza la cantidad
        updatedCart = [...cartProductList]
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity:
            updatedCart[existingProductIndex].quantity + (product.quantity || 1)
        }
      } else {
        // Si el producto no existe, agrega uno nuevo con cantidad inicial
        updatedCart = [
          ...cartProductList,
          { ...product, quantity: product.quantity || 1 }
        ]
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setCartProductList(updatedCart) // Actualiza el contexto cuando se agrega un producto
      toast({
        title: 'Product Added.',
        description: 'Product added to cart successfully.'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error.',
        description: 'Failed to add product to cart.'
      })
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      const existingProductIndex = cartProductList.findIndex(
        (item: any) => item.id === productId
      )
      if (existingProductIndex >= 0) {
        const updatedCart = [...cartProductList]
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: quantity
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCartProductList(updatedCart) // Actualiza el contexto cuando se actualiza la cantidad
      } else {
        toast({
          variant: 'destructive',
          title: 'Error.',
          description: 'Product not found in cart.'
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error.',
        description: 'Failed to update product quantity.'
      })
    }
  }

  const removeFromCart = (productId: string) => {
    try {
      const updatedCart = cartProductList.filter(
        (product: any) => product.id !== productId
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setCartProductList(updatedCart) // Actualiza el contexto cuando se elimina un producto
      toast({
        title: 'Product Removed.',
        description: 'Product removed from cart successfully.'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error.',
        description: 'Failed to remove product from cart.'
      })
    }
  }

  const clearCart = () => {
    try {
      localStorage.removeItem('cart')
      setCartProductList([]) // Limpia el contexto cuando se vacía el carrito
      toast({
        title: 'Cart Cleared.',
        description: 'Cart has been cleared successfully.'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error.',
        description: 'Failed to clear the cart.'
      })
    }
  }

  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
}

export default useCart
