"use server";

import "flowbite";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import TrendingCampaigns from "../Components/HeaderFooterHome/trendingsectionHome";
import { Link } from "react-router-dom";
import VideoHoverBox from "../Components/HeaderFooterHome/videoBoxHome";

const HomePage = () => {
  return (
    <div className="bg-gray-100 m-2">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-start justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/herosection_bg_2.jpg')" }}
      >
        <article className="bg-blue-50 border-gray-200 dark:bg-blue-900 bg-opacity-50 lg:m-20 md:m-8 m-4 p-10 rounded-lg text-center text-white max-w-8xl">
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
        </article>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50 border-gray-200 dark:bg-blue-900">
        <article className="max-w-full mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">How It Works</h2>

          {/* Layout for small & medium devices (kept intact) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 lg:m-4">
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
        </article>
      </section>

      {/* Trending Campaigns */}
      <TrendingCampaigns />

      {/* Video Previews of Campaigns */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-blue-900 p-8">
        <div className="block space-y-8 w-full max-w-full">
          {/* Left box: video reveals from the left */}
          <VideoHoverBox
            videoSrc="https://www.youtube.com/embed/yxR-R4aLmt4?si=sIP3cxqsIjZT2iA6"
            thumbnailSrc="/trending/campaign1.jpg"
            title="Empower the next generation of innovators with modern education!"
            reverse={false}
          />
          {/* Right box: video reveals from the right */}
          <VideoHoverBox
            videoSrc="https://www.youtube.com/embed/CWeURo9iA3g?si=7JlnGZh5ElgSFX0D"
            thumbnailSrc="/trending/campaign3.jpg"
            title="Discover inspiring stories and support them with your donations!"
            reverse={true}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#e0ba03] border-y-2 border-gray-50 dark:border-blue-700">
        <article className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">FAQs</h2>
          <div className="mt-8 p-4 md:p-2">
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
              {
                question: "Who can start a campaign on FundMyKnowledge?",
                answer:
                  "Anyone with a genuine need for educational support can create a campaign after verification.",
              },
              {
                question: "What kind of campaigns are allowed?",
                answer:
                  "Campaigns focused on educational needs like tuition, books, courses, school/college fees or other related categories are welcome.",
              },
              {
                question: "How long does it take to verify a campaign?",
                answer:
                  "Campaign verification typically takes 24-48 hours after submitting campaign details and verifying personal details with Admin.",
              },
            ].map(({ question, answer }, index) => (
              <div key={index} className="border-b py-4">
                <p className="w-full text-left flex justify-between items-center text-xl font-semibold">
                  {question}
                </p>
                <p className="mt-2 text-lg text-gray-700 pl-6 relative before:content-['⇒'] before:absolute before:left-0">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default HomePage;
