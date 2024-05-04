import React, { useState } from 'react';
import axios from 'axios';

function ModalConfirmed({ onClose, driverId, driverFullName, updateCars }) {
    const [fullname, setFullName] = useState(driverFullName || '');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullname) {
            try {
                await axios.post('https://baqylau-backend.undefined.ink/api/confirmed', { id: driverId, fullname });
                updateCars(); // Обновляем состояние cars после успешного подтверждения
                onClose();
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
                setError('Ошибка при отправке данных');
            }
        } else {
            setError('Пожалуйста, заполните все поля');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white p-8 rounded-lg z-10" style={{ minWidth: "340px" }} onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-4">Подтверждение водителя</h2>
                <div >
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ФИО водителя:</label>
                        <input type="text" id="fullName" name="fullName" value={fullname} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-2 py-4" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="carId" className="block text-sm font-medium text-gray-700">ID машины:</label>
                        <input type="text" id="carId" name="carId" readOnly value={driverId} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-2 py-4" />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <div className="flex justify-end">
                        <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Подтвердить</button>
                        <button type="button" onClick={onClose} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmed;
