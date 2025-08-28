// Format a date string
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Calculate carbon savings based on delivery method
export const calculateCarbonSavings = (deliveryMethod, distance) => {
  const carbonFactors = {
    bicycle: 0,
    ebike: 0.015, // kg CO2 per km
    car: 0.192, // kg CO2 per km (average car)
  };

  const savedEmissions =
    (carbonFactors.car - carbonFactors[deliveryMethod]) * distance;
  return savedEmissions.toFixed(2);
};

// Generate a random color for charts
export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// Format currency
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Validate email address
export const isValidEmail = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(String(email).toLowerCase());
};
