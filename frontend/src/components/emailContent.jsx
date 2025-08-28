export const getOrderConfirmationEmailHTML = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping Order Details</title>
    <style> body { font-family: Arial, sans-serif; } .card { max-width: 600px; margin: auto; padding: 16px; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden; } .header { background-color: #38a169; color: white; text-align: center; padding: 16px; } .section { padding: 16px; border-bottom: 1px solid #e2e8f0; } .section:last-child { border-bottom: none; } .title { font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; } .detail { display: flex; justify-content: space-between; margin-bottom: 8px; } .label { font-weight: 500; color: #718096; } .value { font-weight: 600; } .value.text-right { text-align: right; } </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>Shipping Order Details</h1>
        </div>

        <div class="section">
            <h2>Sender Information</h2>
            <div class="info-row">
                <span class="label">Sender Name:</span>
                <span class="value">${data.sender}</span>
            </div>
            <div class="info-row">
                <span class="label">Sender Phone:</span>
                <span class="value">${data.senderPhone}</span>
            </div>
            <div class="info-row">
                <span class="label">Sender Address:</span>
                <span class="value">
                    ${data.pickupAddress.address1}, ${
  data.pickupAddress.address2
}, ${data.pickupAddress.city}, 
                    ${data.pickupAddress.province}, ${
  data.pickupAddress.postalCode
}, ${data.pickupAddress.country}
                </span>
            </div>
        </div>

        <div class="section">
            <h2>Receiver Information</h2>
            <div class="info-row">
                <span class="label">Receiver Name:</span>
                <span class="value">${data.receiver}</span>
            </div>
            <div class="info-row">
                <span class="label">Receiver Phone:</span>
                <span class="value">${data.receiverPhone}</span>
            </div>
            <div class="info-row">
                <span class="label">Receiver Address:</span>
                <span class="value">
                    ${data.deliveryAddress.address1}, ${
  data.deliveryAddress.address2
}, ${data.deliveryAddress.city}, 
                    ${data.deliveryAddress.province}, ${
  data.deliveryAddress.postalCode
}, ${data.deliveryAddress.country}
                </span>
            </div>
        </div>

        <div class="section">
            <h2>Shipping Details</h2>
            <div class="info-row">
                <span class="label">Item:</span>
                <span class="value">${data.shippingItem}</span>
            </div>
            <div class="info-row">
                <span class="label">Weight:</span>
                <span class="value">${data.shippingWeight} kg</span>
            </div>
            <div class="info-row">
                <span class="label">No. of Packages:</span>
                <span class="value">${data.numberOfItems}</span>
            </div>
            <div class="info-row">
                <span class="label">Shipping Date:</span>
                <span class="value">${data.shippingDate}</span>
            </div>
            <div class="info-row">
                <span class="label">Shipping Note:</span>
                <span class="value">${data.shippingNote}</span>
            </div>
        </div>

        <div class="section">
            <h2>Delivery Details</h2>
            <div class="info-row">
                <span class="label">Estimated Distance:</span>
                <span class="value">${data.distance} km</span>
            </div>
            <div class="info-row">
                <span class="label">Estimated Delivery Time:</span>
                <span class="value">${data.duration} minutes</span>
            </div>
        </div>

        <div class="section">
            <h2>Pricing Details</h2>
            <div class="info-row">
                <span class="label">Total Price:</span>
                <span class="value">$${data.price}</span>
            </div>
        </div>

        <div class="section">
            <div class="info-row">
            <span class="label">Order id:</span>
                <span class="value">${data.orderId}</span>
            </div>
            <div class="info-row">
                <span class="label">Order Created At:</span>
                <span class="value">${
                  new Date(data.createdAt).toISOString().split("T")[0]
                }</span>
            </div>
        </div>
    </div>
</body>
</html>
`;
