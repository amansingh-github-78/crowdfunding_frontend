import { useEffect, useRef, use , useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../../Store/apiContext";
import Alert from "../../Utils/alert";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { paymentApi } = use(ApiContext);
  const { campaignId, txnid, amount, donorEmail, donorName } = useParams();
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertError, setAlertError] = useState(false)
  const alreadyCalled = useRef(false);

  const Mutation = useMutation({
    mutationFn: ({ campaignId, txnid, amount, donorEmail, donorName }) =>
      paymentApi.successPayment({ campaignId, txnid, amount, donorEmail, donorName }),
    onSuccess: () => {
      setAlertSuccess(true)
    },
    onError: () => {
      setAlertError(true);
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
    const timeout = setTimeout(() => navigate(`/explore`), 3000);
    return () => clearTimeout(timeout);
  },[navigate])

  return (
    <>
    {alertSuccess && 
    (<Alert
      message="Payment Status Saved Successfully!!"
      type="green"
    />)
    }
    {alertError && 
    (<Alert
      message="Payment Status Wasn't Saved...Contact Support!!"
      type="red"
    />)
    }
    <div className="min-h-96 flex items-center justify-center bg-amber-300">
      <div className="bg-green-200 p-6 rounded-md text-center min-w-lg">
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p>Thank you for your donation.</p>
      </div>
    </div>
    </>
  );
};

export default PaymentSuccess;
