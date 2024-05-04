import React, { useState,useEffect } from 'react';
import { Navigate,Link } from 'react-router-dom';
import CreateOrg from './CreateOrg';
import io from "socket.io-client";


import md5 from 'md5';

function ListOrg({ user, organizations,setUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    
    const [isBillingOpen, setIsBillingOpen] = useState(false);
  const toggleBilling = () => setIsBillingOpen(!isBillingOpen);


  const getUserAvatarURL = (email) => {
    if (!email) return '';
  
    const emailHash = md5(email);
  
    return `https://www.gravatar.com/avatar/${emailHash}`
  };


if(!user) return <Navigate to="/" />

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <body className='bg-gray-900  w-screen h-screen '>
    
    <div class="min-h-full">
    <div class="bg-gray-900 -800 pb-32">
        <nav class="bg-gray-900 ">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="border-b border-gray-700">
                    <div class="flex h-16 items-center justify-between px-4 sm:px-0">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                            <div to="/organization" className="text-xl font-bold text-yellow-600">baqylau</div>
                            </div>
                            <div class=" md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="#"
                                        class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                                        Организации ({user.organizations.length})
                                    </a>
                                    <Link to="/biling" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                         onClick={toggleBilling}>
                        Тарифы
                      </Link>
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-4 flex items-center md:ml-6">
                              
      <img 
src={getUserAvatarURL(user.email)} alt="" className='rounded-3xl w-12'/>
                              
                                <div class="relative ml-3">
                                 
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <header class="py-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-white">Ваши организации</h1>
            </div>
        </header>
    </div>

    <div class="-mt-32">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="px-4 bg-white rounded-xl">
        <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Название
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Кол-во водителей
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Статус
                            </th>
                      
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
  {user.organizations.map((organization, index) => (
    <tr key={index}>
      <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div class="flex items-center">
          <div class="ml-4">
            <div class="font-medium text-gray-900">{organization.title}</div>
            <div class="mt-1 text-gray-500">{organization.email}</div>
          </div>
        </div>
      </td>
      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <div class="text-gray-900">{organization.length}</div>
        <div class="mt-1 text-gray-500 ml-10">{organization.cars.length}</div>
      </td>
      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <span class={`inline-flex items-center rounded-md bg-${organization.isActive ? 'green' : 'green'}-50 px-2 py-1 text-xs font-medium text-${organization.isActive ? 'green' : 'green'}-700 ring-1 ring-inset ring-${organization.isActive ? 'green' : 'green'}-600/20`}>
          {organization.isActive ? 'Active' : 'Active'}
        </span>
      </td>
      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    <Link to={`/map/${organization._id}`}> Открыть</Link>
      </td>
    </tr>
  ))}
</tbody>

                </table>
            </div>
        </div>
    </div>
</div>
        <button
        type="button"
        className="mt-10 rounded-md bg-indigo-500 px-5 py-2 text-xl text-end right-0 font-semibold text-white shadow-sm hover:bg-indigo-400 "
        onClick={toggleModal}
        >
        Создать
      </button>
      </div>
        </div>
    </div>


      {/* Информация о пользователе */}
     

      {/* Модальное окно для создания организации */}
      {isModalOpen && (
        <CreateOrg toggleModal={toggleModal} user={user} setUser={setUser} />
      )}

   </body>
  );
}

export default ListOrg;
