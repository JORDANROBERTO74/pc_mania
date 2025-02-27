import React from 'react'
import { storeData } from '@/components/fakeData/storeData'
import Link from 'next/link'
import { ABOUT_US, CART } from './navigation/Constants'

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de Nosotros</h3>
            <p className="text-muted-foreground">
              {storeData?.aboutUs?.description2}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <div className="flex flex-col text-muted-foreground">
              <Link href={`/`}>Productos</Link>
              <Link href={`${CART}`}>Carrito</Link>
              <Link href={`${ABOUT_US}`}>Acerca de Nosotros</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <p className="text-muted-foreground">
              {`Email: ${storeData?.contact?.email}`}
            </p>
            <p className="text-muted-foreground">
              {`Teléfono: ${storeData?.contact?.phone}`}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 pb-4 border-t text-center text-muted-foreground">
          © 2024 {storeData?.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
