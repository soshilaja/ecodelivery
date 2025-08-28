import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  TruckIcon,
  ChevronRight,
  Globe,
  Clock,
  CheckCircle,
  TreePine,
  Car,
} from "lucide-react";

// Savings Calculator Function
const calculateEcoDeliverySavings = (annualDeliveryVolume) => {
  // Refined constant values for rideshare realism
  const AVERAGE_DIESEL_TRUCK_EMISSIONS = 0.185; // kg CO2 per mile (average for rideshare vehicles)
  const ELECTRIC_TRUCK_EMISSIONS = 0.02; // kg CO2 per mile (lower for EVs)
  const AVERAGE_DELIVERY_DISTANCE = 5.0; // miles (adjusted for typical urban rideshare distances)
  const CARBON_OFFSET_COST = 80; // $ per metric ton of CO2 (adjusted for offset programs)
  const FUEL_COST_SAVINGS_PER_MILE = 0.20; // $ per mile (lower for rideshare vehicles)

  if (annualDeliveryVolume <= 0 || isNaN(annualDeliveryVolume)) {
    throw new Error('Please enter a valid delivery volume');
  }

  // Helper function to format numbers with commas
  const formatNumber = (number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculations
  const totalMilesPerYear = annualDeliveryVolume * AVERAGE_DELIVERY_DISTANCE;
  const conventionalEmissions = totalMilesPerYear * AVERAGE_DIESEL_TRUCK_EMISSIONS; // kg CO2
  const ecoEmissions = totalMilesPerYear * ELECTRIC_TRUCK_EMISSIONS; // kg CO2
  const carbonSavings = conventionalEmissions - ecoEmissions; // kg CO2

  const carbonOffsetSavings = (carbonSavings / 1000) * CARBON_OFFSET_COST; // $ savings
  const fuelCostSavings = totalMilesPerYear * FUEL_COST_SAVINGS_PER_MILE; // $ savings
  const totalAnnualSavings = carbonOffsetSavings + fuelCostSavings; // Total $ savings

  return {
    annualDeliveryVolume: formatNumber(annualDeliveryVolume),
    carbonEmissionReduction: {
      conventional: formatNumber(conventionalEmissions),
      eco: formatNumber(ecoEmissions),
      savings: formatNumber(carbonSavings)
    },
    financialImpact: {
      carbonOffsetSavings: formatNumber(carbonOffsetSavings),
      fuelCostSavings: formatNumber(fuelCostSavings),
      totalAnnualSavings: formatNumber(totalAnnualSavings)
    },
    equivalentImpact: {
      treesPlanted: formatNumber(Math.round(carbonSavings / 48)), // Approx. 48 kg CO2 offset per tree planted
      carsMitigated: formatNumber(Math.round(carbonSavings / 4600)) // Approx. 4,600 kg CO2 per year per car
    }
  };
};


const B2BLandingPage = () => {
  const [deliveryVolume, setDeliveryVolume] = useState("");
  const [savingsResult, setSavingsResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculateSavings = () => {
    try {
      const result = calculateEcoDeliverySavings(Number(deliveryVolume));
      setSavingsResult(result);
      setError("");
    } catch (err) {
      setSavingsResult(null);
      setError(err.message);
    }
  };

  const features = [
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: "Sustainable Logistics",
      description:
        "Reduce your carbon footprint with our 100% electric delivery fleet and carbon-neutral shipping strategies.",
    },
    {
      icon: <Clock className="w-12 h-12 text-green-600" />,
      title: "Real-Time Tracking",
      description:
        "Advanced tracking technology providing transparent, minute-by-minute updates on your deliveries.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-600" />,
      title: "Comprehensive Reporting",
      description:
        "Detailed sustainability and efficiency reports to showcase your environmental commitment.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Leaf className="w-10 h-10 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">
                EcoDelivery for Business
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your logistics with sustainable, efficient, and
              transparent delivery solutions that align with your environmental
              goals.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/account/order"
                className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
              >
                <span>Request Demo</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-green-100 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
              <TruckIcon className="w-64 h-64 text-green-600 mx-auto" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose EcoDelivery?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&#39;re not just a delivery service. We&#39;re a sustainability
              partner committed to reducing environmental impact while enhancing
              your business efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-xl text-center hover:shadow-xl transition-shadow group"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Calculator with Dynamic Results */}
        <div className="container mx-auto py-16">
          <div className="bg-green-700 text-white rounded-2xl overflow-hidden grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Calculate Your Impact</h2>
              <p className="text-lg mb-6">
                See how much CO2 you can save by switching to our eco-friendly
                delivery network.
              </p>
              <div className="bg-white rounded-lg p-6 text-gray-800">
                <input
                  type="number"
                  value={deliveryVolume}
                  onChange={(e) => setDeliveryVolume(e.target.value)}
                  placeholder="Enter your annual delivery volume"
                  className="w-full border rounded p-2 mb-4"
                />
                <button
                  onClick={handleCalculateSavings}
                  className="w-full bg-green-900 text-white py-3 rounded hover:bg-green-700 transition"
                >
                  Calculate Savings
                </button>
                {error && (
                  <p className="text-red-500 mt-2 text-center">{error}</p>
                )}
              </div>
            </div>

            {savingsResult && (
              <div className="p-12 bg-green-800 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Your Sustainability Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-700 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <TreePine className="w-6 h-6 mr-2" />
                      <span>Trees Equivalent</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {savingsResult.equivalentImpact.treesPlanted} trees
                    </p>
                  </div>
                  <div className="bg-green-700 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Car className="w-6 h-6 mr-2" />
                      <span>Cars Mitigated</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {savingsResult.equivalentImpact.carsMitigated} cars
                    </p>
                  </div>
                  <div className="col-span-2 bg-green-700 p-4 rounded">
                    <h4 className="font-semibold mb-2">Financial Savings</h4>
                    <div className="grid grid-cols-2">
                      <div>
                        <p>Carbon Offset Savings:</p>
                        <p className="font-bold">
                          ${savingsResult.financialImpact.carbonOffsetSavings}
                        </p>
                      </div>
                      <div>
                        <p>Fuel Cost Savings:</p>
                        <p className="font-bold">
                          ${savingsResult.financialImpact.fuelCostSavings}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p>Total Annual Savings:</p>
                      <p className="text-2xl font-bold text-yellow-200">
                        ${savingsResult.financialImpact.totalAnnualSavings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!savingsResult && (
              <div className="hidden md:flex items-center justify-center bg-green-600">
                <Leaf className="w-64 h-64 text-white opacity-20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BLandingPage;