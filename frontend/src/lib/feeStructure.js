export const feeStructures = {
  bike: {
    baseFee: 10,
    distanceFeePerKm: 0.75,
    perMinuteFee: 0.2,
    minFare: 5,
    additionalFeePerKmOver10: 0.5,
    weightSurcharge: [
      { max: 5, surcharge: 0 },
      { max: 10, surcharge: 1.0 },
      { max: 15, surcharge: 2.0 },
    ],
  },
  "electric-bike": {
    baseFee: 14,
    distanceFeePerKm: 1,
    perMinuteFee: 0.25,
    minFare: 9,
    additionalFeePerKmOver10: 0.5,
    weightSurcharge: [
      { max: 10, surcharge: 0 },
      { max: 20, surcharge: 2.0 },
      { max: 30, surcharge: 3.5 },
    ],
  },
  "electric-vehicle": {
    baseFee: 17, // Increased base fee
    distanceFeePerKm: 1.2,
    perMinuteFee: 0.3,
    minFare: 12,
    additionalFeePerKmOver10: 0.75,
    weightSurcharge: [
      { max: 15, surcharge: 0 },
      { max: 30, surcharge: 2.5 },
      // For weights over 30 kg, surcharge is calculated dynamically
    ],
  },
};
