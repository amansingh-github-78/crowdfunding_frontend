import { useState, useEffect, use } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../Store/apiContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    reason: "",
    contact: "",
    message: "",
  });
  const { contactApi, authApi } = use(ApiContext);
  const [user, setUser] = useState(null);

  // Fetch User Data
  const userMutation = useMutation({
    mutationFn: () => authApi.getUser(),
    onSuccess: (data) => {
      setUser(data.data);
    },
    onError: () => {
      setUser(null);
    },
  });

  // Fetch User Data
  const contactMutation = useMutation({
    mutationFn: contactApi.submitContactForm,
    onSuccess: () => {
      alert("Successfull!!");
    },
    onError: () => {
      alert("Not Succesfull!!");
    },
  });

  useEffect(() => {
    userMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(formData);
    setFormData({ reason: "", name: "", email: "", contact: "", message: "" });
  };

  return (
    <div className="bg-[#e0ba03] min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-blue-900 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form Section */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block 0 mb-1">Reason</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
                >
                  <option value="">Select a reason</option>
                  <option value="Inquiry">General Inquiry</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Issue">Issue</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user?.name || ""}
                  readOnly
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="text"
                  name="name"
                  value={user?.email || ""}
                  readOnly
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Contact Info (Optional)</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Your Phone or Other Contact"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your query, complaint, or issue..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-black"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Emails Section */}
          <div className="w-full md:w-1/3 bg-gray-200 text-black rounded-md p-4">
            <h2 className="text-2xl font-bold mb-8">Contact Emails</h2>
            <p className="mb-2">
              <strong>Support:</strong> support@fundmyknowledge.com
            </p>
            <p className="mb-2">
              <strong>Info:</strong> info@fundmyknowledge.com
            </p>
            <p className="mb-2">
              <strong>Feedback:</strong> feedback@fundmyknowledge.com
            </p>
            <p>
              <strong>Admin:</strong> admin@fundmyknowledge.com
            </p>
            <div className="md:mt-16 hidden md:block">
              <img
                src="/fmk_logo.png"
                alt="How It Works"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
