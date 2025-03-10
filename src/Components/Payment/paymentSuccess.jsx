import { useEffect, useRef, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../../Store/apiContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { paymentApi } = use(ApiContext);
  const { campaignId, txnid, amount, donorEmail, donorName } = useParams();
  const alreadyCalled = useRef(false);

  const Mutation = useMutation({
    mutationFn: ({ campaignId, txnid, amount, donorEmail, donorName }) =>
      paymentApi.successPayment({ campaignId, txnid, amount, donorEmail, donorName }),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (err) => {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    },
  });

  useEffect(() => {
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;
    
    if (!txnid || !amount || !campaignId || !donorEmail || !donorName) {
      return;
    }

    Mutation.mutate({ campaignId, txnid, amount, donorEmail, donorName });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    const timeout = setTimeout(() => navigate(`/explore`), 5000);
    return () => clearTimeout(timeout);
  },[navigate])

  return (
    <div className="min-h-96 flex items-center justify-center bg-amber-300">
      <div className="bg-green-200 p-6 rounded-md text-center min-w-lg">
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p>Thank you for your donation.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
