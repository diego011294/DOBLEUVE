import { Icon } from "@iconify/react/dist/iconify.js"

export const ServiciosInicio = () => {
    return (
        <div className="p-8">
            <div className="bg-[#A989AE] mt-[80px]">
                <div className="text-center text-white font-montserrat flex flex-wrap justify-center items-center gap-20 p-20">

                    {/* ENVIO GRATIS */}
                    <div className="flex flex-col justify-center items-center w-48">
                        <img className="w-[70px] mb-5" src="/img/icon2.svg" alt="Devolución" />
                        <h1 className="mb-2">
                            ENVÍOS GRATIS MÁS DE 50 €
                        </h1>
                        <p className="font-light text-sm">
                            Entrega en 3-5 días tras preparar tu pedido
                        </p>
                    </div>

                    {/* PERSONALIZACIÓN */}
                    <div className="flex flex-col justify-center items-center w-48">
                        <img className="w-[70px] mb-5" src="/img/icon3.svg" alt="Devolución" />
                        <h1 className="mb-2">
                            PERSONALÍZALOS
                        </h1>
                        <p className="font-light text-sm">
                            Personalízalos a tu manera para eventos especiales o celebraciones
                        </p>
                    </div>

                    {/* CUIDADOS */}
                    <div className="flex flex-col justify-center items-center w-48">
                        <img className="w-[70px] mb-5" src="/img/icon4.svg" alt="Devolución" />
                        <h1 className="mb-2">
                            CUIDADOS
                        </h1>
                        <p className="font-light text-sm">
                            Guárdalos en un estuche rígido, no les pongas peso encima y evita doblarlos
                        </p>
                    </div>

                    {/* COMPRA SEGURA */}
                    <div className="flex flex-col justify-center items-center w-48">
                        <img className="w-[70px] mb-5" src="/img/icon1.svg" alt="Devolución" />
                        <h1 className="mb-2">
                            COMPRA SEGURA
                        </h1>
                        <p className="font-light text-sm">
                            Pago rápido y seguro a través de la plataforma Stripe
                        </p>
                    </div>
                    <div className="font-montserrat text-white text-center font-light">
                        <p className="font-light mb-3 w-72 md:w-full">
                            Si necesitas más información no dudes en contactar con nosotros
                        </p>
                        <h1 className="font-semibold md:text-xl">
                            ¡ ESTAREMOS ENCANTADOS DE AYUDARTE !
                        </h1>
                        <div className="flex justify-center">
                            <button className="flex items-center group pt-10">
                                Contacta ahora
                                <Icon className="text-xl transition-transform duration-500 group-hover:translate-x-2" icon="iconamoon:arrow-right-2-thin" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}