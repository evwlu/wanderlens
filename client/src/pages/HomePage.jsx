import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxAPIKey } from '../private/Key';
import { saveAs } from 'file-saver';

const HomePage = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    zoom: 3,
  });

  useEffect(() => {
    const fetchAndSaveCities = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/city.json?country=US&types=place&access_token=${mapboxAPIKey}`
        );
        const data = await response.json();

        // Extract city names from the features
        // const cityNames = data.features.map((feature) => feature.text);

        // Convert city names to a JSON string
        // const jsonString = JSON.stringify(cityNames, null, 2);

        // Create a Blob with the JSON data
        // const blob = new Blob([jsonString], { type: 'application/json' });

        // Save the Blob as a JSON file
        // saveAs(blob, 'cityNames.json');

        console.log('City names saved to cityNames.json');
      } catch (error) {
        console.error('Error fetching or saving cities:', error);
      }
    };

    fetchAndSaveCities();
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={mapboxAPIKey}
      />
    </div>
  );
};

export default HomePage;
