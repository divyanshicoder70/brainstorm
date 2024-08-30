import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css'; 
const Dashboard = () => {
    const [upcomingLaunches, setUpcomingLaunches] = useState([]);
    const [previousLaunches, setPreviousLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isUpcomingLaunch = (launchDate) => {
        const today = new Date();
        const launch = new Date(launchDate);
        return launch >= today;
    };

    useEffect(() => {
        // Fetch launches data from SpaceX API
        axios.get('https://api.spacexdata.com/v4/launches')
            .then(response => {
                const data = response.data;

                // Filter upcoming and previous launches
                const upcoming = data.filter(launch => isUpcomingLaunch(launch.date_utc));
                const previous = data.filter(launch => !isUpcomingLaunch(launch.date_utc));

                setUpcomingLaunches(upcoming);
                setPreviousLaunches(previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch launches data.');
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <h1> Dashboard</h1>
            
            {/* Launch Facilities Section */}
            <section>
                <h2>Launch Facilities</h2>
                <ul>
                    <li>Falcon 9: Vandenberg Space Force Base</li>
                    <li>Falcon Heavy: Kennedy Space Center</li>
                    <li>Starship: Boca Chica Launch Site</li>
                </ul>
            </section>

            {/* Starlink Section */}
            <section>
                <h2>Starlink</h2>
                <p>Starlink is a satellite internet constellation operated by SpaceX, providing satellite Internet access coverage to most of the Earth.</p>
            </section>

            {/* Upcoming Launches Section */}
            <section>
                <h2>Upcoming Launches</h2>
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {upcomingLaunches.length > 0 ? (
                    <ul>
                        {upcomingLaunches.map(launch => (
                            <li key={launch.id}>
                                <h3>{launch.name}</h3>
                                <p>{launch.details || 'No details available.'}</p>
                                <p><strong>Launch Date:</strong> {new Date(launch.date_utc).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : !loading && <p>No upcoming launches.</p>}
            </section>

            {/* Previous Launches Section */}
            <section>
                <h2>Previous Launches</h2>
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {previousLaunches.length > 0 ? (
                    <ul>
                        {previousLaunches.map(launch => (
                            <li key={launch.id}>
                                <h3>{launch.name}</h3>
                                <p>{launch.details || 'No details available.'}</p>
                                <p><strong>Launch Date:</strong> {new Date(launch.date_utc).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : !loading && <p>No previous launches.</p>}
            </section>
        </div>
    );
};

export default Dashboard;