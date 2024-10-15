
export const AboutInicio = () => {
  return (
    <div className="flex justify-center flex-wrap items-center gap-10">
      <img src="/img/aboutInicio.png" alt="Marina y pendientes" />
      <div className="w-[450px] font-montserrat text-[#333333] p-3 md:mt-20">
        <h2 className=" text-center text-xl pb-[35px]">
          Atrévete a ser diferente y deja que cada pieza hable de ti.
        </h2>
        <h1 className="text-center text-2xl font-bold italic text-[#FFA07D]">
          Porque al final, la belleza real está en la esencia de cada uno...
        </h1>
        <div className='flex justify-center items-center pt-[60px]'>
            <button className='border border-[#A989AE] text-[#A989AE] w-44 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white'>
                Conócenos más
            </button>
        </div>
      </div>
    </div>
  )
}

