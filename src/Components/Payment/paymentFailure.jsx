import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(`/explore`), 5000);
  }, [ navigate]);

  return (
    <div className="min-h-96 flex items-center justify-center bg-amber-300">
      <div className="bg-red-200 p-6 rounded-md text-center min-w-lg">
        <h2 className="text-2xl font-bold">Payment Failed</h2>
        <p>Something went wrong. Please try again.</p>
      </div>
    </div>
  );
};

export default PaymentFailure;
