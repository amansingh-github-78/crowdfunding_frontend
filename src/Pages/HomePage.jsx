import { useState } from "react";
import "flowbite";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import TrendingCampaigns from "../Components/HeaderFooterHome/trendingsectionHome";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="bg-gray-100 m-2">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-start justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/herosection_bg_2.jpg')" }}
      >
        <div className="bg-blue-50 border-gray-200 dark:bg-blue-900 bg-opacity-50 lg:m-20 md:m-8 m-4 p-10 rounded-lg text-center text-white max-w-8xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Fund The Future, Support Education
          </motion.h1>
          <p className="text-lg md:text-xl mb-6">
            Help students and poor children bring their dreams to life by
            funding their education and education utilities need.
          </p>
          <motion.div className="space-x-4 flex flex-nowrap justify-center">
            <Link
              to="/explore"
              className="bg-[#e0ba03] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Start Funding {/*Explore Campaigns Section*/}
            </Link>
            <Link
              to="/start"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Ask for Funding {/*Start Campaign Section*/}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50 border-gray-200 dark:bg-blue-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {["Create Campaign", "Get Verified", "Receive Donations"].map(
              (title, index) => (
                <motion.div
                  key={index}
                  className="p-6 border rounded-lg shadow-lg bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaCheckCircle className="text-5xl text-blue-500 mx-auto" />
                  <h3 className="text-xl font-semibold mt-4">{title}</h3>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Trending Campaigns */}     
        <TrendingCampaigns />

      {/* FAQ Section */}
      <section className="py-16 bg-[#e0ba03] border-y-2 border-gray-50 dark:border-blue-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">FAQs</h2>
          <div className="mt-8 p-2">
            {[
              {
                question: "How does FundMyKnowledge work?",
                answer:
                  "You can create a campaign to raise funds or donate to support others.",
              },
              {
                question: "Is it safe to donate?",
                answer:
                  "Yes, we use secure payment gateways to protect your transactions.",
              },
              {
                question: "Can I withdraw my funds anytime?",
                answer:
                  "Yes, you can request withdrawals as per our guidelines.",
              },
            ].map(({ question, answer }, index) => (
              <div key={index} className="border-b py-4">
                <button
                  className="w-full text-left flex justify-between items-center text-lg font-semibold"
                  onClick={() => toggleFAQ(index)}
                >
                  {question}
                  <span>{faqOpen === index ? "−" : "+"}</span>
                </button>
                {faqOpen === index && (
                  <p className="mt-2 text-gray-600">{answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
