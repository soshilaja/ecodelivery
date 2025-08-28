import PropTypes from "prop-types";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
import { Input } from "./ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const ShippingInfo = ({
  receiverPhone,
  setReceiverPhone,
  receiver,
  setReceiver,
  address,
  setAddress,
  address2,
  setAddress2,
  error,
}) => {
  const handlePlaceSelected = (data, error) => {
    if (error) {
      setAddress((prev) => ({ ...prev, error }));
    } else {
      setAddress((prev) => ({
        ...prev,
        address1: data.address1,
        city: data.city,
        state: data.state,
        postal: data.postcode,
        country: data.country,
        error: "",
      }));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>

      <label className="block mt-2">
        <span className="form-label">Receiver Name*</span>
        <Input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          name="receiver"
          id="receiver"
          placeholder="Receiver Name"
        />
      </label>
      {error.receiver && (
        <div className="mt-4 text-red-500">{error.receiver}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Receiver Telephone*</span>
        <PhoneInput
          defaultCountry="ca"
          value={receiverPhone}
          onChange={(receiverPhone) => setReceiverPhone(receiverPhone)}
          hideDropdown={true}
          inputClassName="w-full p-3 border font-medium border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      {error.receiverPhone && (
        <div className="mt-4 text-red-500">{error.receiverPhone}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Deliver to*</span>
        <GoogleMapsAutocomplete
          onPlaceSelected={handlePlaceSelected}
          placeholder={address?.address1 || "Delivery Address"}
          id="delivery-address"

          // required
        />
      </label>
      {error.shipAddress && (
        <div className="mt-4 text-red-500">{error.shipAddress}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Apartment, unit, suite, or floor #</span>
        <Input
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          name="delivery-address2"
          id="delivery-address2"
          placeholder="Apartment, unit, suite, or floor #"
        />
      </label>
    </div>
  );
};


ShippingInfo.propTypes = {
  receiverPhone: PropTypes.string.isRequired,
  setReceiverPhone: PropTypes.func.isRequired,
  receiver: PropTypes.string.isRequired,
  setReceiver: PropTypes.func.isRequired,
  address: PropTypes.shape({
    address1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postal: PropTypes.string,
    country: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  setAddress: PropTypes.func.isRequired,
  address2: PropTypes.string,
  setAddress2: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


export default ShippingInfo;


