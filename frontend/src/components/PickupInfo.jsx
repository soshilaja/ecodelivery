import PropTypes from "prop-types";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
import { Input } from "./ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const PickupInfo = ({
  senderEmail,
  setSenderEmail,
  senderPhone,
  setSenderPhone,
  sender,
  setSender,
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
      <h2 className="text-xl font-semibold mb-2">Pickup Information</h2>

      <label className="block mt-2">
        <span className="form-label">Sender Name*</span>
        <Input
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          name="sender"
          id="sender"
          placeholder="Sender Name"
          // required
        />
      </label>
      {error.sender && <div className="mt-4 text-red-500">{error.sender}</div>}

      <label className="block mt-2">
        <span className="form-label">Sender E-mail*</span>
        <Input
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          name="sender e-mail"
          id="sender e-mail"
          placeholder="Sender E-mail"
          // required
        />
      </label>
      {error.senderEmail && (
        <div className="mt-4 text-red-500">{error.senderEmail}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Sender Telephone*</span>
        <PhoneInput
          defaultCountry="ca"
          value={senderPhone}
          onChange={(senderPhone) => setSenderPhone(senderPhone)}
          hideDropdown={true}
          inputClassName="w-full p-3 border font-medium border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      {error.senderPhone && (
        <div className="mt-4 text-red-500">{error.senderPhone}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Pickup from*</span>
        <GoogleMapsAutocomplete
          onPlaceSelected={handlePlaceSelected}
          placeholder={address?.address1 || "Pickup Address"}
          id="pickup-address"
          // required
        />
      </label>
      {error.pickupAddress && (
        <div className="mt-4 text-red-500">{error.pickupAddress}</div>
      )}

      <label className="block mt-2">
        <span className="form-label">Apartment, unit, suite, or floor #</span>
        <Input
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          name="pickup-address2"
          id="pickup-address2"
          placeholder="Apartment, unit, suite, or floor #"
        />
      </label>
    </div>
  );
};

PickupInfo.propTypes = {
  senderEmail: PropTypes.string.isRequired,
  setSenderEmail: PropTypes.func.isRequired,
  senderPhone: PropTypes.string.isRequired,
  setSenderPhone: PropTypes.func.isRequired,
  sender: PropTypes.string.isRequired,
  setSender: PropTypes.func.isRequired,
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
  setError: PropTypes.func.isRequired,
};

export default PickupInfo;
