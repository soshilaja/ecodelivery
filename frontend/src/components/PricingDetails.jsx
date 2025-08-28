
import { useEffect, useState } from "react";
import { useGoogleMapsApi } from "../hooks/useGoogleMaps";
import { feeStructures } from "../lib/feeStructure";
import PropTypes from "prop-types";

const deliveryMethods = {
  bike: {
    name: "Bike",
    maxWeight: 15,
    travelMode: "BICYCLING",
    icon: "🚲",
    environmentalDiscount: 7,
    maxDistance: 10,
  },
  "electric-bike": {
    name: "Electric Bike",
    maxWeight: 30,
    travelMode: "BICYCLING",
    icon: "⚡🚲",
    environmentalDiscount: 5,
    maxDistance: null,
  },
  "electric-vehicle": {
    name: "Electric Vehicle",
    maxWeight: 50,
    travelMode: "DRIVING",
    icon: "🚗",
    environmentalDiscount: 0,
    maxDistance: null, // no distance limit
  },
};

const PricingDetails = ({
  // setSelectedVehicle,
  setDeliveryMethod, // Make optional with default no-op function
  // setVehicleType,
  isPeak,
  itemWeight,
  setDistance,
  setDuration,
  setPrice,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [estimates, setEstimates] = useState({
    distance: null,
    duration: null,
    price: null,
    tax: null,
  });
  const [error, setError] = useState([]);
  const [myData, setMyData] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [availableMethods, setAvailableMethods] = useState(deliveryMethods);
  const { isLoaded,
    // loadError
  } = useGoogleMapsApi();

  useEffect(() => {
    const storedData = sessionStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMyData(parsedData);
      if (
        parsedData.pickupAddress?.postalCode &&
        parsedData.deliveryAddress?.postalCode
      ) {
        setIsDataReady(true);
      } else {
        setError((prev) => [...prev, "Missing required address data"]);
      }
    }
  }, []);

  const formatAddress = (addressData) => {
    if (!addressData) return "";
    return [
      addressData.address1,
      addressData.address2,
      addressData.city,
      addressData.province,
      addressData.postalCode,
      addressData.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const calculatePricing = (vehicleType, distance, duration) => {
    const selectedFee = feeStructures[vehicleType];
    if (!selectedFee) return null;

    let total = selectedFee.baseFee;
    total += selectedFee.distanceFeePerKm * distance;
    total += selectedFee.perMinuteFee * duration;

    if (distance > 10) {
      total += selectedFee.additionalFeePerKmOver10 * (distance - 10);
    }

    const weight = parseFloat(itemWeight);
    let weightSurcharge = 0;

    if (vehicleType === "electric-vehicle" && weight > 30) {
      weightSurcharge = 2.5 + (weight - 30) * 3.85;
    } else {
      for (const bracket of selectedFee.weightSurcharge) {
        if (weight <= bracket.max) {
          weightSurcharge = bracket.surcharge;
          break;
        }
      }
    }

    total += weightSurcharge;

    if (isPeak) {
      total *= 1.15;
    }

    const environmentalDiscount =
      deliveryMethods[vehicleType].environmentalDiscount;
    if (environmentalDiscount > 0) {
      total *= 1 - environmentalDiscount / 100;
    }

    total = Math.max(total, selectedFee.minFare);
    total = Math.round(total * 100) / 100;
    const tax = +(total * 0.15).toFixed(2);
    const grandTotal = +(total + tax).toFixed(2);

    return { total: grandTotal, tax };
  };

  const updateAvailableDeliveryMethods = (distance) => {
    const updatedMethods = {};
    Object.entries(deliveryMethods).forEach(([type, details]) => {
      if (!details.maxDistance || distance <= details.maxDistance) {
        updatedMethods[type] = details;
      }
    });
    setAvailableMethods(updatedMethods);

    // If currently selected vehicle is no longer available, clear selection
    if (selectedVehicle && !updatedMethods[selectedVehicle]) {
      
      setSelectedVehicle(null);
      setDeliveryMethod(null);
      setEstimates({
        distance: null,
        duration: null,
        price: null,
        tax: null,
      });
    }
  };

  const fetchDistanceForVehicle = async (vehicleType) => {
    if (!myData || !isDataReady || !isLoaded) return;
    
    try {
      const service = new window.google.maps.DistanceMatrixService();
      const pickupFormatted = formatAddress(myData.pickupAddress);
      const deliveryFormatted = formatAddress(myData.deliveryAddress);
      const travelMode = deliveryMethods[vehicleType].travelMode;
      
      const response = await new Promise((resolve, reject) => {
        service.getDistanceMatrix(
          {
            origins: [pickupFormatted],
            destinations: [deliveryFormatted],
            travelMode,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            if (status === "OK") resolve(response);
            else reject(new Error(`Failed to fetch distance: ${status}`));
          }
        );
      });
      console.log(vehicleType);

      const element = response.rows[0].elements[0];
      if (element.status === "OK") {
        const distance = element.distance.value / 1000;
        const duration = element.duration.value / 60;

        // Update available delivery methods based on distance
        updateAvailableDeliveryMethods(distance);

        // Check if selected vehicle is still valid for this distance
        if (
          deliveryMethods[vehicleType].maxDistance &&
          distance > deliveryMethods[vehicleType].maxDistance
        ) {
          setError((prev) => [
            ...prev,
            `${deliveryMethods[vehicleType].name} delivery is not available for distances over ${deliveryMethods[vehicleType].maxDistance}km`,
          ]);
          return;
        }

        const pricing = calculatePricing(vehicleType, distance, duration);

        setEstimates({
          distance,
          duration,
          price: pricing.total,
          tax: pricing.tax,
        });

        setDistance(distance);
        setDuration(duration);
        setPrice(pricing.total);
      }
    } catch (err) {
      setError((prev) => [...prev, `Error calculating route: ${err.message}`]);
    }
  };

  const handleVehicleSelect = (vehicleType) => {
    setError([]); // Clear previous errors

    const weight = parseFloat(itemWeight);
    const maxWeight = deliveryMethods[vehicleType].maxWeight;

    if (weight > maxWeight) {
      setError((prev) => [
        ...prev,
        `Weight exceeds ${vehicleType} capacity of ${maxWeight}kg`,
      ]);
      return;
    }

    setSelectedVehicle(vehicleType);
    setDeliveryMethod(vehicleType);
    fetchDistanceForVehicle(vehicleType);
  };

  // Initial distance check for all delivery methods
  useEffect(() => {
    if (estimates.distance) {
      updateAvailableDeliveryMethods(estimates.distance);
    }
  }, [estimates.distance]);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Select Delivery Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(availableMethods).map(([type, details]) => (
            <button
              key={type}
              onClick={() => handleVehicleSelect(type)}
              className={`p-4 rounded-lg border transition-all ${
                selectedVehicle === type
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="text-2xl mb-2">{details.icon}</div>
              <div className="font-medium">{details.name}</div>
              <div className="text-sm text-gray-600">
                Max weight: {details.maxWeight}kg
                {details.maxDistance && (
                  <div>Max distance: {details.maxDistance}km</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {error.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          {error.map((err, i) => (
            <p key={i} className="text-red-600">
              {err}
            </p>
          ))}
        </div>
      )}

      {selectedVehicle && estimates.price && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Vehicle:</span>{" "}
              {selectedVehicle}
            </p>
            <p>
              <span className="font-medium">Distance:</span>{" "}
              {estimates.distance.toFixed(1)} km
            </p>
            <p>
              <span className="font-medium">Duration:</span>{" "}
              {estimates.duration.toFixed(0)} minutes
            </p>
            <p>
              <span className="font-medium">Weight:</span> {itemWeight} kg
            </p>
            <p>
              <span className="font-medium">HST:</span> ${estimates.tax}
            </p>
            <p className="text-lg font-semibold">
              Total Price: ${estimates.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

PricingDetails.propTypes = {
  pickupAddress: PropTypes.object,
  deliveryAddress: PropTypes.object,
  setDeliveryMethod: PropTypes.func,
  isPeak: PropTypes.bool,
  itemWeight: PropTypes.string.isRequired,
  setDistance: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
};

export default PricingDetails;