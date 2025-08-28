import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Ensure your API key is set in your environment variables

const PlacesFinder = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  // const mapRef = useRef(null); // Reference for the map container
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  // let map; // Variable to hold the Google Map instance

  const handlePlaceChanged = (type) => () => {
    const place =
      type === "origin"
        ? originRef.current.getPlace()
        : destinationRef.current.getPlace();
    if (place) {
      const address = place.formatted_address;
      if (type === "origin") {
        setOrigin(address);
      } else {
        setDestination(address);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted")
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });


    loader.load().then(() => {
      // Initialize the Google Maps API
      // const { Map } = window.google.maps;

      // map = new Map(mapRef.current, {
      //   center: { lat: 44.65107, lng: -63.582687 },
      //   zoom: 12,
      // });

      // Initialize Autocomplete for the origin and destination inputs
      const originAutocomplete = new window.google.maps.places.Autocomplete(
        originRef.current,
        {
          componentRestrictions: { country: ["ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        }
      );
      const destinationAutocomplete =
        new window.google.maps.places.Autocomplete(destinationRef.current, {
          componentRestrictions: { country: ["ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        });

      originAutocomplete.addListener(
        "place_changed",
        handlePlaceChanged("origin")
      );
      destinationAutocomplete.addListener(
        "place_changed",
        handlePlaceChanged("destination")
      );
    });
  }, []);

  return (
    <div>
      <h1>Route Planner</h1>
      {/* <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "400px" }}
      ></div> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input type="text" id="origin" ref={originRef} />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" ref={destinationRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PlacesFinder;
