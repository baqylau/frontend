import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { he } from 'date-fns/locale';

const CreateOrg = ({ setUser, user, toggleModal }) => {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setIsLoading] = useState(false);


    

const handleSubmit = async () => {
    if (loading) return;
    if (!email || !title) {
        toast.error("Введите все данные");
        return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("carsToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axios.post('https://baqylau-backend.undefined.ink/api/organization', 
                                          { title, email },
                                          { headers: headers });
        console.log(response);
        if (response.data.success) {
            setUser(response.data.user);
            toast.success("Организация успешно создана");
            toggleModal()
        } else {
            toast.error(response.data.message || "Ошибка создания организации");
        }
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        if (error.response) {
            console.log(error.response.data); // Логируем тело ошибки
            toast.error("Ошибка при создании организации: " + (error.response.data.message || "Ошибка сервера"));
        } else {
            toast.error("Сетевая ошибка");
        }
    } finally {
        setIsLoading(false);
    }
};


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white p-10 rounded-lg shadow-xl sm:w-9/12">
            <h2 className="font-bold text-lg mb-4">Создание новой организации</h2>
            <div>
                <label className="block mb-2 text-black">Название организации:</label>
                <input type="text" className="border p-2 rounded w-full mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label className="block mb-2 text-black">Почта:</label>
                <input type="text" className="border p-2 rounded w-full mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="button" onClick={() => {toggleModal(); setTitle(''); setEmail('');}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Отмена
                </button>
                <button type="submit" onClick={handleSubmit}  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Создать
                </button>
            </div>
        </div>
    </div>
    );
};

export default CreateOrg;
