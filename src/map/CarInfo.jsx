const CarInfo = ({ car, onClose }) => {
    return (
        <div className="rounded-xl absolute left-2 bottom-5 z-10 bg-white border-2 border-black p-2 ">
            <div>
                <div className="flex gap-8 notif_close"> 
                <h2 className="font-bold text-xl">Информация водителя</h2>
                    <button className="z-20" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p><span className="font-bold">Имя:</span> {car.fullname}</p>
                <p><span className="font-bold">Координаты:</span> {car.lat},{car.lng}</p>
            </div>
        </div>
    );
};

export default CarInfo;
