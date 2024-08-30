import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './rocket.css'; 


const Rockets = () => {
    const [rockets, setRockets] = useState([]);
    const [selectedRocket, setSelectedRocket] = useState(null);

    useEffect(() => {
        const fetchRockets = async () => {
            try {
                const response = await axios.get('https://api.spacexdata.com/v4/rockets');
                setRockets(response.data);
            } catch (error) {
                console.error('Error fetching rockets:', error);
            }
        };

        fetchRockets();
    }, []);

    const handleRocketClick = (rocket) => {
        setSelectedRocket(rocket);
    };

    const handleClosePopup = () => {
        setSelectedRocket(null);
    };

    return (
        <div className="rockets-container">
            <h2 className="rockets-title"> Rockets</h2>
            <ul className="rockets-list">
                {rockets.map((rocket) => (
                    <li key={rocket.id} onClick={() => handleRocketClick(rocket)} className="rocket-item">
                        <img src={rocket.flickr_images[0]} alt={rocket.name} className="rocket-image" />
                        <p className="rocket-name">{rocket.name}</p>
                    </li>
                ))}
            </ul>

            {selectedRocket && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="popup-title">{selectedRocket.name}</h3>
                        <p className="popup-description">{selectedRocket.description}</p>
                        <img src={selectedRocket.flickr_images[0]} alt={selectedRocket.name} className="popup-image" />
                        <button onClick={handleClosePopup} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rockets;