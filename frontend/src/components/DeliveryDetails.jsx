import { Input } from "./ui/input";
import PropTypes from "prop-types";

// const deliveryMethodsList = [
//   { name: "bike", maxWeight: 15 },
//   { name: "electric-bike", maxWeight: 30 },
//   { name: "electric-vehicle", maxWeight: 50 },
// ];

const DeliveryDetails = ({
  // deliveryMethod,
  // setDeliveryMethod,
  deliveryItem,
  setDeliveryItem,
  itemWeight,
  setItemWeight,
  totalItems,
  setTotalItems,
  shipDate,
  setShipDate,
  deliveryNote,
  setDeliveryNote,
  error,
  // setError,
}) => {
  // const [availableMethods, setAvailableMethods] = useState(deliveryMethodsList);

  // const formatMethodName = (name) => {
  //   return name
  //     .split("-")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };

  // useEffect(() => {
  //   const weight = parseFloat(itemWeight);
  //   if (isNaN(weight)) return;

  //   const methods = deliveryMethodsList.filter(
  //     (method) => weight <= method.maxWeight
  //   );

  //   // setAvailableMethods(methods);

  //   const currentMethod = deliveryMethodsList.find(
  //     (method) => method.name === deliveryMethod
  //   );

  //   if (
  //     methods.length > 0 &&
  //     (!currentMethod || weight > currentMethod.maxWeight)
  //   ) {
  //     const nextMethod = methods[0];
  //     if (nextMethod && nextMethod.name !== deliveryMethod) {
  //       setDeliveryMethod(nextMethod.name);
  //       setError([
  //         `The item weight exceeds the capacity of the current delivery method. Switching to ${formatMethodName(
  //           nextMethod.name
  //         )}.`,
  //       ]);
  //     }
  //   }
  // }, [itemWeight, deliveryMethod, setDeliveryMethod]);

  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedNextDay = nextDay.toISOString().split("T")[0];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
      <label className="block">
        <span className="form-label">Item(s) Weight (kg)*</span>
        <Input
          value={itemWeight}
          onChange={(e) => setItemWeight(e.target.value)}
          name="item-weight"
          placeholder="Item weight in kg"
          min={0}
          type="number"
        />
      </label>
      {error?.itemWeight && (
        <div className="mt-4 text-red-500">{error.itemWeight}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">No. of packages*</span>
        <Input
          value={totalItems}
          onChange={(e) => setTotalItems(parseFloat(e.target.value))}
          name="items-total"
          placeholder="No. of packages"
          min={0}
          type="number"
        />
      </label>
      {error?.totalItems && (
        <div className="mt-4 text-red-500">{error.totalItems}</div>
      )}

      {/* <label className="block mt-2">
        <span className="form-label">Choose a delivery service*</span>
        <Select
          id="delivery-method"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          {availableMethods.map((method) => (
            <option key={method.name} value={method.name}>
              {formatMethodName(method.name)} (up to {method.maxWeight}kg)
            </option>
          ))}
        </Select>
      </label> */}

      <label className="block mt-2">
        <span className="form-label">What would you like to send?*</span>
        <Input
          value={deliveryItem}
          onChange={(e) => setDeliveryItem(e.target.value)}
          name="delivery-item"
          placeholder="Delivery item"
        />
      </label>
      {error?.deliveryItem && (
        <div className="mt-4 text-red-500">{error.deliveryItem}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">When do you want to ship?*</span>
        <Input
          value={shipDate || ""}
          onChange={(e) => setShipDate(e.target.value)}
          name="ship-date"
          placeholder="Ship date"
          type="date"
          min={formattedToday}
          max={formattedNextDay}
        />
      </label>
      {error?.shipDate && (
        <div className="mt-4 text-red-500">{error.shipDate}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Delivery Note</span>
        <textarea
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
          name="delivery-note"
          rows={3}
          className="block w-full rounded-lg p-3 border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-base sm:leading-6"
          placeholder="Delivery Note"
        />
      </label>
      {error?.deliveryNote && (
        <div className="mt-4 text-red-500">{error.deliveryNote}</div>
      )}
    </div>
  );
};

DeliveryDetails.propTypes = {
  // deliveryMethod: PropTypes.string.isRequired,
  // setDeliveryMethod: PropTypes.func.isRequired,
  deliveryItem: PropTypes.string.isRequired,
  setDeliveryItem: PropTypes.func.isRequired,
  itemWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setItemWeight: PropTypes.func.isRequired,
  totalItems: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setTotalItems: PropTypes.func.isRequired,
  shipDate: PropTypes.string,
  setShipDate: PropTypes.func.isRequired,
  deliveryNote: PropTypes.string.isRequired,
  setDeliveryNote: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setError: PropTypes.func.isRequired,
};

export default DeliveryDetails;
