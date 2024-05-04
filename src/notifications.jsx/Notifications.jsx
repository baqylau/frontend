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

function Notifications({ notifications }) {
  return (
    <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 ">
      <div className="rounded-lg  ">
        {notifications.length === 0 ? (
          <div style={{color:"white", textAlign:"center"}}></div>
        ) : (
          <div
            className="border-b border-gray-200"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <div className="grid gap-4 ">
              {notifications.reverse().map((notif, index) => (
                <div
                  key={index}
                  className="bg-white px-2  w-96 rounded-xl flex items-center border-2 border-black relative"
                >
                  {notif.type === "speed" ? (
                    <img
                      src={speedImage}
                      alt="Speed Notification"
                      className="bg-gray-200 p-2 rounded-xl"
                      style={{ width: "50px", marginRight: "20px" }}
                    />
                  ) : (
                    <img
                      src={accelerometerImage}
                      alt="Accelerometer Notification"
                      className="bg-gray-200 p-2 rounded-xl"
                      style={{ width: "50px", marginRight: "20px" }}
                    />
                  )}
                  <div>
                    {notif.carNumber.fullname && ( // Проверяем наличие ФИО
                      <div className="font-bold pt-2 ">
                        <div>ФИО: {notif.carNumber.fullname}</div>
                      </div>
                    )}
                    <div className="pb-8">{notif.text}</div>
                  </div>
                  <div className="createdAt absolute bottom-0 right-0 text-gray-400 pr-2">
                    {formatDistanceToNow(notif.createdAt, {
                      addSuffix: true,
                      includeSeconds: true,
                      locale: ru,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  
  
  
  
  );
}

export default Notifications;
