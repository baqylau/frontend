import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  format,
  parseISO,
  differenceInHours,
  formatDistanceToNow,
} from "date-fns";

import speedImage from "../img/red-car.svg";

import accelerometerImage from "../img/accelerometer.svg";
import { ru } from "date-fns/locale";

function Biling({ orgInfo }) {
  const handlePurchase = (planType) => {
    const endpoint = `https://baqylau-backend.undefined.ink/api/buy/${planType}`;

    const body = JSON.stringify({
      orgId: orgInfo._id, 
    });

    // Make the POST request
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => response.json())
    .then(data => {
      // Redirect the user to the returned URL
      console.log(data)
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('URL was not received from the server.');
      }
    })
    .catch(error => {
      console.error('Failed to purchase plan:', error);
    });
    
  };

  return (
    <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg">
        
        <div className="border-b border-gray-200" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <div className="grid gap-4">
            {(orgInfo.type === 'standart' ) && (
             <div className=""> 
            <div className="bg-white p-6 w-96 rounded-xl flex items-center border-2 border-black relative">
            <div>
              <div className="font-bold pt-2">
                <div>Prime</div>
              </div>
              <div className="">
                <ul role="list" className="text-sm leading-6 text-gray-900 list-disc" style={{marginLeft:"20px"}}>
                  <li>Трекинг в реальном времени</li>
                  <li>Неограниченное количество водителей</li>
                  <li>Отчеты</li>
                  <li>Уведомления</li>
                  <li>API</li>
                  <li>Обнаружение водителей</li>
                </ul>
                <button 
                  className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handlePurchase('premium')}
                >
                  Купить
                </button>
              </div>
            </div>
          </div></div>
            )}
            {(orgInfo.type === 'free' ) && (
             <div className=""> <div className="bg-white p-6 w-96 rounded-xl flex items-center border-2 border-black relative">
             <div>
               <div className="font-bold pt-2">
                 <div>Standart</div>
               </div>
               <div className="">
                 <ul role="list" className="text-sm leading-6 text-gray-900 list-disc" style={{marginLeft:"20px"}}>
                   <li>Трекинг в реальном времени</li>
                   <li>До 20-ти водителей</li>
                   <li>Отчеты</li>
                   <li>Уведомления</li>
                 </ul>
                 <button 
                   className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                   onClick={() => handlePurchase('standart')}
                 >
                   Купить
                 </button>
               </div>
             </div>
           </div>
            <div className="bg-white p-6 w-96 rounded-xl flex items-center border-2 border-black relative">
            <div>
              <div className="font-bold pt-2">
                <div>Prime</div>
              </div>
              <div className="">
                <ul role="list" className="text-sm leading-6 text-gray-900 list-disc" style={{marginLeft:"20px"}}>
                  <li>Трекинг в реальном времени</li>
                  <li>Неограниченное количество водителей</li>
                  <li>Отчеты</li>
                  <li>Уведомления</li>
                  <li>API</li>
                  <li>Обнаружение водителей</li>
                </ul>
                <button 
                  className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handlePurchase('premium')}
                >
                  Купить
                </button>
              </div>
            </div>
          </div></div>
            )}
            {orgInfo.type === 'premium' && (
              <div className="bg-white p-6 w-96 rounded-xl flex items-center border-2 border-black relative">
                <div>
                  <div className="pt-2">
                  <div className="text-xl font-bold ">Ваш тариф: {orgInfo.type}</div>
                    <div>Вы приобрели максимальный тариф</div>
                  </div>
                  <div className="">
             
                
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biling;