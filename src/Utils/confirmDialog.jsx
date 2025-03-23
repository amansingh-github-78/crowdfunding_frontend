import ForgotPassword from "../Components/Authentication/ForgotPassword";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  dialogforreset,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {!dialogforreset ? (
        <div className="fixed inset-0 flex items-center justify-center bg-amber-300 bg-opacity-50">
          <div className="bg-blue-900 text-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <p className="text-gray-200 mb-4">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-amber-300 bg-opacity-50">
          <div className="bg-blue-900 text-white p-6 rounded-md shadow-lg">
              <ForgotPassword notlogin/>
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-500 text-white rounded-md"
              >
                Close
              </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
