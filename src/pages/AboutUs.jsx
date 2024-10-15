

export const AboutUs = () => {
    return (
        <div>
            <div className='relative w-full md:pr-8 lg:pr-8 md:pl-8 lg:pl-8'>
                <div style={{ backgroundImage: "url('/img/fondoPatron.jpg')" }} className="bg-cover w-full h-[200px] flex justify-center items-center">
                    <h1 className="text-white text-3xl md:text-4xl font-montserrat text-center font-extrabold">
                        SOBRE NOSOTROS
                    </h1>
                </div>
            </div>
            <div
                className="flex flex-col justify-center items-center bg-fill bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/img/fondodobleuve.svg')" }}>

                <div className=" md:max-w-[1320px] flex justify-center items-center gap-10 flex-wrap p-3 mt-10 md:mt-26">
                    <img className="md:w-[350px]" src="img/marina1.jpg" alt="Marina1" />

                    <div className=" md:max-w-[700px] flex flex-col gap-5 text-[#333333] font-montserrat">
                        <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight'>
                            QUIENES <span className='text-[#FFA07D] font-semibold'>SOMOS</span>
                        </h1>
                        <p>
                        DOBLEUVE es un espacio de creación artesanal nacido en Galicia a finales del año 2021. <br /> 
                        Nuestra especialidad es la joyería. Hacemos pendientes para todos los estilos, desde los más sencillos para el día a día, hasta los más atrevidos, personalizándolos para eventos u ocasiones especiales. <br />
                        Todos nuestros productos están hechos a mano, por lo que cada pieza es única y no encontraras otros iguales.                        
                        </p>

                    </div>
                </div>
                <div className=" z-20 md:max-w-[1320px] flex flex-row-reverse justify-center items-center gap-10 flex-wrap p-3 mt-10 md:mt-26">
                    <img className="md:w-[300px]" src="img/marina2.jpg" alt="Marina1" />

                    <div className=" md:max-w-[700px] flex flex-col gap-5 text-[#333333] font-montserrat">
                        <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight'>
                            NUESTROS <span className='text-[#A989AE] font-semibold'>MATERIALES</span>
                        </h1>
                        <p>
                        En DOBLEUVE apostamos por la comodidad. Por eso todas nuestras piezas están hechas de arcilla polimérica, un material muy ligero y duradero, que te ofrecerá la posibilidad de lucir cualquier pendiente sin importar su tamaño. <br />
                        Las fornituras que utilizamos son de acero inoxidable hipoalergénico. Sólamente en pedidos personalizados se podrá optar por fornituras de Plata de Ley.
                        </p>

                    </div>
                </div>
            </div>
            <div className=" transform mt-10 lg:-translate-y-32 w-full flex flex-col gap-5 justify-center items-center p-14 md:p-32 md:mt-26 bg-[#e3dce343] text-[#333333] font-montserrat">
                <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight'>
                    NUESTROS <span className='text-[#FBC286] font-semibold'>VALORES</span>
                </h1>
                <p className="text-center lg:w-[800px]">
                    Creemos en la artesanía como forma de expresión artística, creando piezas únicas y exclusivas capaces de transmitir la esencia propia de cada persona. Para ello basamos nuestro trabajo en la creatividad y la originalidad, proporcionándole un valor especial a cada una de nuestras creaciones. 
                </p>
            </div>
        </div>
    )
}
