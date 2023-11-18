import React, { useRef, useState } from 'react';
import Map from 'react-map-gl'  
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom'
import { mapboxAPIKey } from '../private/Key.js'
import '../styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [viewState, setViewState] = React.useState({
        longitude : -98.5795, 
        latitude : 36.8283,
        zoom : 3.5
    });

    const [featureData, setFeatureData] = useState("Select A Location!")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    
    const mapRef = useRef(null)

    const onMapClick = async (e) => {
        if (mapRef.current == null) { return null; }
        const lngLat = e.lngLat;

        try {
            const response = await fetch( `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?types=place&access_token=${mapboxAPIKey}` );
            const data = await response.json();
    
            // Find the nearest major city in the response. 
            const majorCities = data.features.filter((feature) => feature.place_type.includes('place'));
            if (majorCities.length > 0) {
                const nearestCity = majorCities[0].text;
                const country = majorCities[0].context.find((context) => context.id.includes('country')).text;
    
                setCity(nearestCity);
                setCountry(country);
                setFeatureData(`${nearestCity}, ${country}`);
            } else {
                setCity("");
                setCountry("");
                setFeatureData("No Cities Found Nearby!");
                console.log('No major cities found in the response.');
            }
        } catch (error) {
            console.error('Error fetching city information:', error);
        }
    };

    const onButtonClick = () => {
        if (city !== "" && country !== "") {
            navigate(`/gallery/${country}/${city}`);
        }
    }


    return (
        <div className="map-container" aria-label = "map body">
            <Map
                ref = {mapRef}
                mapboxAccessToken={mapboxAPIKey}
                longitude={viewState.longitude}
                latitude={viewState.latitude}
                zoom={viewState.zoom}
                onMove={(ev) => setViewState(ev.viewState)}
                style={{width:window.innerWidth, height:window.innerHeight*0.9}}
                mapStyle={'mapbox://styles/mapbox/light-v10'}
                onClick={(e) => {
                    onMapClick(e)
                }}
                aria-label="interactive map"
                >
            </Map>
            {}
            <button className="access_box" onClick = {() => onButtonClick()} > {featureData} </button>

        </div>
    );
}


export default HomePage;
