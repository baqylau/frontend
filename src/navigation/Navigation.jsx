import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DriversTab from '../carUser/CarsUser';
import Notifications from '../notifications.jsx/Notifications';
import logo from '../img/bakyl-logo.png';
import Loader from '../img/bakyl.png'; // Импорт компонента лоадера
import Biling from './Bilings';

const Navigation = ({notifications,orgInfo,drivers,setDrivers}) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showDriversTab, setShowDriversTab] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showBiling, setShowBiling] = useState(false);
    const [loading, setLoading] = useState(false); // Состояние для лоадера

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        if (showNotifications) {
            setShowNotifications(false);
        }
        if (showDriversTab) {
            setShowDriversTab(false);
        }if (showBiling) {
            setShowBiling(false);
        }
    };

    const toggleDriversTab = () => {
        setShowDriversTab(!showDriversTab);
        if (showNotifications) {
            setShowNotifications(false);
        }
        if (showMobileMenu) {
            setShowMobileMenu(false);
        }if (showBiling) {
            setShowBiling(false);
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (showDriversTab) {
            setShowDriversTab(false);
        }
        if (showMobileMenu) {
            setShowMobileMenu(false);
        }if (showBiling) {
            setShowBiling(false);
        }
    };

    const toggleShowBiling = () => {
        setShowBiling(!showBiling);
        if (showNotifications) {
            setShowNotifications(false);
        }
        if (showMobileMenu) {
            setShowMobileMenu(false);
        }if (showDriversTab) {
            setShowDriversTab(false);
        }
    };

    return (
        <nav className="bg-gray-800 rounded-xl absolute right-1 top-5 z-10">
            <div className="px-2 mx-auto max-w-7xl">
                <div className="relative flex items-center justify-between h-16">

                    <div className="flex items-center justify-center flex-1">
                     
                        <div className="">
                            <div className="flex space-x-4">
                            <div className="flex items-center flex-shrink-0">
                            <Link to="/organization" className="text-xl font-bold text-yellow-600">baqylau</Link>
                        </div>
                                <button onClick={toggleMobileMenu}  className={`px-3 py-2 text-sm font-medium ${!showDriversTab && !showBiling ? "text-white" : "text-gray-400 hover:text-white hover:bg-gray-700 rounded-md active:bg-gray-700"} rounded-md active:bg-gray-700`}>Карта</button>
                                <button onClick={toggleDriversTab} className={`px-3 py-2 text-sm font-medium ${showDriversTab ? "text-white" : "text-gray-400 hover:text-white hover:bg-gray-700 rounded-md active:bg-gray-700"} `}>Водители</button>
                                <button onClick={toggleShowBiling} className={`px-3 py-2 text-sm font-medium ${showBiling ? "text-white" : "text-gray-400 hover:text-white hover:bg-gray-700 rounded-md active:bg-gray-700"} `}>Тариф</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center inset-y-0 right-0 pr-2">
                        <button onClick={toggleNotifications} type="button" className={`p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



            {loading && <Loader />} {/* Отображение лоадера */}

            {showDriversTab && <DriversTab drivers={drivers} setDrivers={setDrivers} />}
            {showNotifications && <Notifications notifications={notifications} />}
            {showBiling && <Biling orgInfo={orgInfo}/>}
        </nav>

    );
}

export default Navigation;
