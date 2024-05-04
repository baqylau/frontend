import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';
import Navigation from '../navigation/Navigation';
import "./style.css"
import gazel from '../img/bakyl.png';
import gazelRed from '../img/gazelRed.jpg';
import 'mapbox-gl/dist/mapbox-gl.css';
import CarInfo from './CarInfo';
import ReactDOM from 'react-dom';
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import bakyl from "../img/bakyl.png";
import Back from './Back';
const MapWithMarkers = ({ user }) => {
    const {id} = useParams()
    const nav = useNavigate()
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orgInfo, setOrgInfo] = useState(null);

    useEffect(() => {
        if(!id) return 
        async function getOrg() {
            const response = await fetch(`https://baqylau-backend.undefined.ink/api/organization/${id}`).then(res => res.json());
            console.log(response);
            if(response.success) {
                setOrgInfo(response.organization)
            } else {
                return toast.error("Ошибка при загрузке данных")
            }
            
        }

        getOrg() 
    }, [id]);

    useEffect(() => {
        setCoordinates(prevCoordinates => [...prevCoordinates, ...cars.map(car => ({ lng: parseFloat(car.lng), lat: parseFloat(car.lat) }))]);
    }, [cars]);

    useEffect(() => {
        if (!map) return;
        markers.forEach(marker => {
            const { lng, lat } = marker.getLngLat();
            marker.setLngLat([lng, lat]);
        });
    }, [coordinates, map, markers]);


    useEffect(() => {
        if(!id) return 
        const socket = io(`https://baqylau-backend.undefined.ink?orgId=${id}`, {
            reconnectionAttempts: 60,
            timeout: 10000,
        });

        socket.on('GET_CARS', (data) => {
            console.log(data)
            setCars(data.filter((car) => car.active !== false));
            setDrivers(data);
        });

        socket.on("GET_NOTIFICATIONS", (data) => {
            setNotifications(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    useEffect(() => {
        setCoordinates(prevCoordinates => [...prevCoordinates, ...cars.map(car => ({ lng: parseFloat(car.lng), lat: parseFloat(car.lat) }))]);
    }, [cars]);

    useEffect(() => {
        if (!map) return;
        markers.forEach(marker => {
            const { lng, lat } = marker.getLngLat();
            marker.setLngLat([lng, lat]);
        });
    }, [coordinates, map, markers]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGRkZGRkYW55YSIsImEiOiJjbHZpMG5xMjIwajNzMnZxb2FrbW1wMnh4In0.HCL8keo5WFgvJw5UcyY_9Q';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [76.9567793, 52.2498683],
            zoom: 12
        });

        setMap(map);

        return () => {
            map.remove();
        };
    }, []);

    useEffect(() => {
        if (!map) return;
        markers.forEach(marker => marker.remove());

        const newMarkers = cars.map(car => {
            if (!car.active) return
            
            const newMarker = document.createElement('div');
            newMarker.className = 'custom-marker';
            newMarker.style.width = '40px';
            newMarker.style.height = '40px';
            if ((Date.now() / 1000) - (new Date(car.cooldown) / 1000) < 10) {
                newMarker.style.backgroundImage = `url(${gazelRed})`
                newMarker.style.borderRadius = "50px"
            } else {
                 newMarker.style.backgroundImage = `url(${gazel})`; 
            }
            const marker = new mapboxgl.Marker(newMarker)
                .setLngLat([parseFloat(car.lng), parseFloat(car.lat)])
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
    /*            setSelectedCar(car);

                const existingCarInfoContainer = newMarker.querySelector('.car-info-container');
                if (existingCarInfoContainer) {
                    existingCarInfoContainer.remove();
                }*/

                setSelectedCar(car);

                /*const carInfoContainer = document.createElement('div');
                carInfoContainer.className = 'car-info-container';
                newMarker.appendChild(carInfoContainer);
                ReactDOM.render(<CarInfo car={car} onClose={() => setSelectedCar(null)} />, carInfoContainer);*/
            });

            return marker;
        })

        setMarkers(newMarkers);

        return () => {
            newMarkers.forEach(marker => marker.remove());
        };
    }, [cars, map]);


    //if(orgInfo === null) return <div className="flex min-h-screen justify-center items-center">
   // <img src={bakyl} alt="Loader" className="animate-spin h-16 w-16" />
//</div>

console.log(orgInfo);
    return (
        <div className="container_map">
            {selectedCar && <CarInfo  car={selectedCar} onClose={() => setSelectedCar(null)} />}
            {user === false && <Navigate to="/" />}
            <div className="absolute top-0 bottom-0 w-full h-screen overflow-hidden">
                <Back />
                <Navigation notifications={notifications} orgInfo={orgInfo} drivers={drivers} setDrivers={setDrivers}/>
                <div id="map" className="absolute top-0 bottom-0 w-full h-full overflow-hidden" />
            </div>
        </div>
    );
};

export default MapWithMarkers;
