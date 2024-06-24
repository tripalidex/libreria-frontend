import { IoIosMail } from 'react-icons/io';
import logoUsil from '../../../assets/logo-usil-big.png'
import { Link } from 'react-router-dom';

function ForgetPassword() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{"backgroundImage": "url('../src/assets/campus-usil.png')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='relative z-10 bg-white p-8 rounded-lg w-96'>
            <div className='mb-5 flex flex-col items-center space-y-4'>
                    <img
                        src={ logoUsil}
                        className="rounded-lg w-28 h-28"
                    />
                    <h1 className='text-3xl font-bold text-center'>Recuperar contraseña</h1>
                </div>
                <form className='flex flex-col gap-4'>
                    <div className='relative'>
                        <IoIosMail className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500'/>
                        <input 
                            type='email'
                            className='w-full border border-gray-200 outline-none py-2 px-8 rounded-lg'
                            placeholder='Correo electrónico'
                        />
                    </div>
                    <div className='tetx-center'>
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/"
                            className="text-usil-color font-medium hover:underline transition-all"
                        >
                            Ingresa
                        </Link>
                    </div>
                    <div>
                        <button className="bg-usil-color text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword