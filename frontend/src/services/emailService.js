import axios from "axios";
import { getOrderConfirmationEmailHTML } from "../components/emailContent";

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

export const sendOrderConfirmationEmail = async (data) => {

  const options = {
    method: "POST",
    url: "https://api.brevo.com/v3/smtp/email",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    data: {
      sender: {
        name: "Eco Delivery",
        email: "stephenoshilaja@redmelon-consulting.com",
      },
      to: [
        {
          email: data.senderEmail,
          name: data.customerName || "Valued Customer",
        },
      ],
      subject: "Order Confirmation",
      htmlContent: getOrderConfirmationEmailHTML(data),
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
