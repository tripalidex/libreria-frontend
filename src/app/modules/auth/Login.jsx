import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaKey, FaUser } from "react-icons/fa";
import logoUsil from '../../../assets/logo-usil-big.png'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../../../api/axios';
const LOGIN_URL = '/auth/login';

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(LOGIN_URL, {
                mail: user,
                contrasena: password,
            });
            const token = response?.data?.token;
            const rol = response?.data?.rol;
            console.log(response?.data?.rol);
            setAuth({ user, password, rol, token});
            navigate(from, {replace: true})
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{"backgroundImage": "url('../src/assets/campus-usil.png')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='relative z-10 bg-white p-8 rounded-lg w-96'>
                <div className='mb-5 flex flex-col items-center space-y-4'>
                    <img
                        src={ logoUsil}
                        className="rounded-lg w-28 h-28"
                    />
                    <h1 className='text-3xl font-bold text-center'>Iniciar sesión</h1>
                </div>
                <form className='flex flex-col gap-4'>
                    <div className='relative'>
                        <FaUser className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
                        <input
                            type='email'
                            className='w-full border border-gray-200 outline-none py-2 px-8 rounded-lg'
                            placeholder='Usuario'
                            onChange={(e) => {setUser(e.target.value)}}
                            value={user}
                        />
                    </div>
                    <div className='relative'>
                        <FaKey className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
                        <input 
                            type= {showPassword ? 'text' : 'password'}
                            className='w-full border border-gray-200 outline-none py-2 px-8 rounded-lg'
                            placeholder='Contraseña'
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                        />
                        {showPassword ? (
                            <IoMdEye onClick={handleShowPassword} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer'/>
                        ) : (
                            <IoMdEyeOff onClick={handleShowPassword} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer'/>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input type="checkbox"/>
                            <label className="text-gray-500">Recordarme</label>
                        </div>
                        <div>
                            <Link 
                                to="forget-password"
                                className="text-gray-500 hover:text-usil-color hover:underline transition-colors"
                            >
                            ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>                    
                    <div>
                        <button className="bg-usil-color text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"
                            onClick={handleSubmit} >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login