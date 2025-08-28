
import OrderForm from "../../components/OrderForm";


const NewOrderPage = () => {

  return (
    <div className="p-4  bg-gray-100 max-w-2xl mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">Place a New Order</h1>
      <OrderForm />
    </div>
  );
};

export default NewOrderPage;
