'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Lightbulb, Mail, Phone, Star } from 'lucide-react'
import { storeData } from '../../components/fakeData/storeData'
import { Spinner } from '@/components/ui/spinner'

export default function AboutUs() {
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  const sendMessageToWhatsApp = () => {
    const message = `
        Hola%20${storeData?.name}.%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos.
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
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-6">Acerca de Nosotros</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            ¡Bienvenido a nuestro mundo! Nos apasiona ofrecer los mejores
            productos y servicios para ayudarte a alcanzar tus metas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-center pb-5">
                <Building2 className="w-12 h-12" />
              </div>
              <CardTitle className="text-center">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Nos esforzamos por crear soluciones innovadoras que mejoren la
                vida de nuestros clientes y comunidades.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <div className="flex justify-center pb-5">
                <Lightbulb className="w-12 h-12" />
              </div>
              <CardTitle className="text-center">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Nuestra visión es ser líderes en nuestra industria, empujando
                constantemente los límites de lo posible.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Star className="text-yellow-400 w-12 h-12 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            ¿Por Qué Elegirnos?
          </h3>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Valoramos la calidad, la innovación y la satisfacción del cliente.
            Nuestro equipo está comprometido a brindar un servicio excelente en
            cada paso.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 my-4">
            Datos de Contacto
          </h3>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <p className="text-muted-foreground">
                {`Email: ${storeData?.contact?.email}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600" />
              <p className="text-muted-foreground">
                {`Teléfono: ${storeData?.contact?.phone}`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            type="button"
            onClick={() => {
              setIsRedirecting(true)
              sendMessageToWhatsApp()
            }}
            className="px-8 py-4"
          >
            {isRedirecting ? <Spinner /> : 'Contáctanos'}
          </Button>
        </div>
      </div>
    </div>
  )
}
