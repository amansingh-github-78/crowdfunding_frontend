import { useState, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../../Store/apiContext";
import Alert from "../../Utils/alert";

const Report = ({ isOpen, onClose , campaignId }) => {
  const { reportApi } = use(ApiContext);
  const [reportData, setReportData] = useState({
    type: "campaign",
    reason: "",
    details: "",
    campaignId: campaignId
  });
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertError, setAlertError] = useState(false)

  const mutation = useMutation({
    mutationFn: reportApi.createReport,
    onSuccess: () => {
      setAlertSuccess(true);
      setReportData({
        type: "campaign",
        reason: "",
        details: "",
        campaignId: campaignId
      })
      setTimeout(() => {
        setAlertSuccess(false);
        onClose()
      }, 3000);
    },
    onError: () => {
      setAlertError(true)
      setTimeout(() => {
        setAlertError(false);
      }, 3000);
    },
  });
  

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(reportData);
  };

  if (!isOpen) return null;

  return (
    <>
    {alertSuccess && 
    (<Alert
      message="Report Submitted Successfully!!"
      type="green"
    />)
    }
    {alertError && 
    (<Alert
      message="Failed to send report!!"
      type="red"
    />)
    }
    <div className="fixed w-full  inset-0 flex items-center justify-center bg-amber-300 bg-opacity-50 text-white">
      <div className="p-6 md:max-w-lg  bg-blue-900 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Type:
            <select
              name="type"
              value={reportData.type}
              onChange={handleChange}
              className="border p-2 rounded w-full text-black"
            >
              <option value="campaign">Campaign</option>
              <option value="user">User</option>
            </select>
          </label>
          <label className="block mb-2">
            Reason:
            <input
              type="text"
              name="reason"
              value={reportData.reason}
              onChange={handleChange}
              className="border p-2 rounded w-full text-black"
              required
            />
          </label>
          <label className="block mb-2">
            Details:
            <textarea
              name="details"
              value={reportData.details}
              onChange={handleChange}
              className="border p-2 rounded w-full text-black"
              required
            ></textarea>
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Report;
