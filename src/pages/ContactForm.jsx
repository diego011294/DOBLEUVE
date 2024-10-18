import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const ContactForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);  // Estado para mostrar cuando se está enviando
  const [message, setMessage] = useState('');  // Estado para el mensaje de éxito o error

  const sendEmail = (e) => {
    e.preventDefault();

    const lastSentTime = localStorage.getItem('lastSentTime');
    const currentTime = Date.now();

    // Convertir el lastSentTime a número antes de la operación
    const timeDifference = currentTime - parseInt(lastSentTime, 10);

    // Limitar el envío a una vez cada 10 minutos (600000 ms)
    if (lastSentTime && timeDifference < 600000) {
      setMessage('Debes esperar 10 minutos antes de enviar otro mensaje.');
      return;
    }

    setIsSending(true);
    setMessage('');

    emailjs.sendForm(
      'service_74xuhyq',  // Reemplaza con tu Service ID
      'template_gvnrfpi', // Reemplaza con tu Template ID
      form.current,
      'SwTo6_LS0DL5IfvLB'  // Reemplaza con tu User ID
    )
      .then((result) => {
        localStorage.setItem('lastSentTime', Date.now());  // Almacenar la última vez que se envió un mensaje
        setMessage('¡Mensaje enviado con éxito!');
        setIsSending(false);
      }, (error) => {
        setMessage('Hubo un error al enviar el mensaje, por favor intenta de nuevo.');
        setIsSending(false);
      });
  };



  return (
    <div>
      <div className='relative w-full md:pr-8 lg:pr-8 md:pl-8 lg:pl-8'>
        <div style={{ backgroundImage: "url('/img/fondoPatron.jpg')" }} className="bg-cover w-full h-[200px] flex justify-center items-center">
          <h1 className="text-white text-3xl md:text-4xl font-montserrat text-center font-extrabold">
            CONTACTO
          </h1>
        </div>
      </div>
      <div className='font-montserrat text-#333 flex justify-center lg:justify-between flex-wrap items-center gap-10 md:gap-20 p-8 md:mt-20'>
        <form ref={form} onSubmit={sendEmail} className=" lg:w-[500px] space-y-5 mx-auto">
          <div>
            <input
              type="text"
              name="user_name"
              className="w-full border-b border-[#A989AE] p-2"
              placeholder='Nombre*'
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="user_email"
              className="w-full border-b border-[#A989AE] p-2"
              placeholder='Email*'
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              className="w-full h-36 border-b border-[#A989AE] p-2 resize-none"
              placeholder='Mensaje*'
              required
            />
          </div>
          <div className='flex items-center gap-2'>
            <input
              type="checkbox"
              required
            />
            <label className='text-sm text-[#333]'>He leido y acepto la política de privacidad <strong>(Leer aquí)</strong></label>
          </div>

          {/* Botón de envío con estado de cargando */}
          <div className="flex">
            <button
              type="submit"
              className="border border-[#A989AE] text-[#A989AE] w-36 h-10 transition-all duration-300 hover:bg-gradient-three hover:text-white mt-5"
              disabled={isSending}  // Deshabilita el botón cuando se está enviando
            >
              {isSending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>

          {/* Mensaje de éxito o error */}
          {message && (
            <p className={`mt-5 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </form>
        <div className='w-[350px] md:w-auto'>
        <div className='bg-[#A989AE] flex flex-col gap-8 p-8 md:p-14 w-auto'>
          <h1 className='text-white text-2xl md:text-3xl font-thin'>
            DATOS DE <span className='font-bold'>CONTACTO</span>
          </h1>
          <div className='space-y-3'>
            <div className='flex items-center text-white gap-3'>
              <Icon className='text-3xl hidden md:block' icon="fluent:phone-20-regular" />
              <h3 className='md:text-lg font-semibold'>+34 630 00 51 41</h3>
            </div>
            <div className='flex items-center text-white gap-3'>
              <Icon className='text-3xl hidden md:block' icon="ion:mail-outline" />
              <h3 className='md:text-lg font-semibold'>dobleuveartesania@gmail.com</h3>
            </div>
          </div>
          <div className='text-white font-thin w-auto md:w-[500px]'>
            <p>
              No dudes en escribirnos si necesitas más información.
              Estaremos encantados de ayudarte
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
