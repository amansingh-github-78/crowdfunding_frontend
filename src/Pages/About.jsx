import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-[#e0ba03] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-12 ">
        {/* About Our Website */}
        <section className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About FundMyKnowledge
          </h1>
          <p className="mt-4 text-gray-200 text-lg">
            FundMyKnowledge is a dedicated crowdfunding platform designed to empower communities and transform lives through education. Our mission is to bridge the gap for underprivileged students by providing access to educational resources, scholarships, and social initiatives.
          </p>
          <p className="mt-2 text-gray-200 text-lg">
            We are committed to transparency, security, and fostering social change. Every donation makes a difference, and together, we can build a brighter future.
          </p>
        </section>

        {/* How It Works */}
        <section className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-gray-200 text-lg">
              Our process is simple and transparent. Campaign creators can easily launch their campaigns by providing detailed descriptions, uploading images and videos, and specifying their goals. Donors can browse, search, and filter campaigns that resonate with them. Once a campaign is live, real-time communication and secure payment processing ensure that every donation reaches its intended purpose.
            </p>
            <div className="mt-4">
              <img
                src="/fmk_logo.png"
                alt="How It Works"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="mt-4">
              <iframe
                className="w-full h-64 rounded-md"
                src="https://www.youtube.com/embed/ipTXmBa8-Zc?si=0P5tvV7MK96O4SFe"
                title="How It Works Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* Terms & Conditions */}
        <section className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h2>
          <p className="mt-4 text-gray-200 text-lg">
            By using FundMyKnowledge, you agree to abide by our terms and conditions. You confirm that all information provided is accurate and that you will use the platform in compliance with all applicable laws. FundMyKnowledge reserves the right to remove any content or campaign that violates our policies.
          </p>
          <p className="mt-2 text-gray-200 text-lg">
            The platform is not responsible for the actions of individual campaign creators or donors. All transactions are subject to verification, and funds may be withheld until campaigns meet the necessary criteria for approval.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h2>
          <p className="mt-4 text-gray-200 text-lg">
            Your privacy is of utmost importance to us. FundMyKnowledge collects and uses your personal data solely for the purpose of facilitating crowdfunding campaigns and ensuring secure transactions. We do not share your information with third parties without your consent, except as required by law.
          </p>
          <p className="mt-2 text-gray-200 text-lg">
            All data is securely stored and handled in accordance with industry best practices. We are committed to safeguarding your information and ensuring that your experience on our platform is both secure and seamless.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
