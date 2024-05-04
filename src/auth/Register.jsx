import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bakyl from "../img/bakyl.png";
import toast from "react-hot-toast"

const Regestration = ({ setUser, user }) => {
    const nav = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user === null) return
        if (user) return nav("/map")
    }, [user])

    const handleSubmit = async () => {
        if (loading) return;
        if (email && password) {
            try {
                setIsLoading(true);
                const response = await axios.post('https://baqylau-backend.undefined.ink/api/register', { email, password });
                if (response.data.success === true) {
                    localStorage.setItem("carsToken", response.data.jwt);
                    setUser(response.data.user);
                    toast.success("Успешная регестрация");
                    nav(`/organization`);
                }
            } catch (error) {
                if (error.response.data.success === false) {
                    toast.error(error.response.data.message);
                }
                console.error('Ошибка при отправке данных:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.error("Введите все данные");
        }
    };

 

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white" style={{minHeight:"100vh"}}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-auto w-2/4" src={bakyl} alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Почтовый адрес</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={() => handleSubmit()} className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-blue-500 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">Зарегистрироваться</button>
                    </div>
                    <div className="">
                         Уже зарегистрированы? <Link to="/" className="text-blue-500">Авторизоватся</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Regestration;

