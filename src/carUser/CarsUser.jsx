import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ModalConfirmed from "./ModalConfirmed";

import "./style.css";

function DriversTab({drivers, setDrivers}) {
  const [activeTab, setActiveTab] = useState("confirmed");
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [confirmedDrivers, setConfirmedDrivers] = useState(null);
  const [pendingDrivers, setPendingDrivers] = useState(null);

  const handleTabClick = (tab) => setActiveTab(tab);

  const confirmDriver = (driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleConfirmModalClose = () => {
    setShowModal(false);
    setSelectedDriver(null);
  };

  const updateCarsAndCloseModal = () => {
    setDrivers(
      drivers.map((car) => {
        if (car.id === selectedDriver.id) {
          return { ...car, active: true };
        }
        return car;
      })
    );
    setShowModal(false);
    setSelectedDriver(null);
  };

  useEffect(() => {
    if (!drivers) return;
    setConfirmedDrivers(drivers.filter((driver) => driver.active));
    setPendingDrivers(drivers.filter((driver) => !driver.active));
  }, [drivers]);


  console.log(drivers);
  return (
    <div className="py-6">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => handleTabClick("confirmed")}
                className={`${
                  activeTab === "confirmed"
                    ? "border-b-2 border-gray-900"
                    : "border-b-2 border-transparent"
                } flex-1 py-2 sm:py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300`}
              >
                Подтвержденные водители
              </button>
              <button
                onClick={() => handleTabClick("pending")}
                className={`${
                  activeTab === "pending"
                    ? "border-b-2 border-gray-900"
                    : "border-b-2 border-transparent"
                } flex-1 py-2 sm:py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300`}
              >
                На подтверждении
              </button>
            </nav>
          </div>
          <div className="p-4 sm:p-6">
            {drivers && drivers.length > 0  ? (
              <>
                {activeTab === "confirmed"  && (
                  confirmedDrivers && confirmedDrivers.length > 0 ? (
                  <div
                    id="confirmed-drivers"
                    className={`flex flex-col space-y-4 ${
                      confirmedDrivers.length > 3
                        ? "max-h-96 overflow-y-auto"
                        : ""
                    }`}
                  >
                    {confirmedDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="bg-gray-100 p-4 rounded-lg shadow"
                      >
                        <div>
                          <strong>ФИО:</strong> {driver.fullname}
                        </div>
                        <div>
                          <strong>Латитуда:</strong> {driver.lat}
                        </div>
                        <div>
                          <strong>Лонгитуда:</strong> {driver.lng}
                        </div>
                        <div>
                          <strong>Активный:</strong> Да
                        </div>
                      </div>
                    ))}
                  </div>
                  ) : "Нет подтвержденных водителей"
                )}
                {activeTab === "pending" && (
                  pendingDrivers && pendingDrivers.length > 0 ? (
                  <div
                    id="pending-drivers"
                    className={`flex flex-col space-y-4 ${
                      pendingDrivers.length > 3
                        ? "max-h-96 overflow-y-auto"
                        : ""
                    }`}
                  >
                    {pendingDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="bg-gray-100 p-4 rounded-lg shadow"
                      >
                        <div>
                          <strong>ID:</strong> {driver.id}
                        </div>
                        <div>
                          <strong>Латитуда:</strong> {driver.lat}
                        </div>
                        <div>
                          <strong>Лонгитуда:</strong> {driver.lng}
                        </div>
                        <div>
                          <strong>Активный:</strong> Нет
                        </div>
                        <button
                          onClick={() => confirmDriver(driver)}
                          className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Подтвердить
                        </button>
                      </div>
                    ))}
                  </div>) : "Нет подтвержденных водителей"
                )}
              </>
            ) : (
              <div style={{ color: "black", textAlign: "center" }}>
                Нет водителей
              </div>
            )}

            {showModal && (
              <ModalConfirmed
                onClose={handleConfirmModalClose}
                driverId={selectedDriver.id}
                driverFullName={selectedDriver.fullname}
                updateCars={updateCarsAndCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriversTab;
