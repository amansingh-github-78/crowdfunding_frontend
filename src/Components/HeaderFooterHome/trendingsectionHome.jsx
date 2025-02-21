import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TrendingCampaigns = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const campaigns = [
    "/trending/campaign1.jpg",
    "/trending/campaign2.jpg",
    "/trending/campaign3.jpg",
    "/trending/campaign4.jpg",
    "/trending/campaign5.jpg",
    "/trending/campaign6.jpg",
  ].concat([
    "/trending/campaign1.jpg",
    "/trending/campaign2.jpg",
    "/trending/campaign3.jpg",
    "/trending/campaign4.jpg",
    "/trending/campaign5.jpg",
    "/trending/campaign6.jpg",
  ]);
  
  // Cloned for smooth infinite scrolling
  const infiniteCampaigns = [...campaigns, campaigns[0], campaigns[1]];

  return (
    <section className="py-16 bg-[#e0ba03] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Trending Campaigns</h2>
        <div className="relative mt-10">
          {!isMobile ? (
            // 🔵 Desktop (Horizontal Scrolling)
            <motion.div
              className="flex space-x-6"
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {infiniteCampaigns.map((src, index) => (
                <>
                  <Link to="/explore" onClick={() => window.scrollTo(0, 0)}>
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg shadow-lg flex-shrink-0 pt-8"
                      style={{ width: "250px", height: "300px" }}
                    >
                      <img
                        src={src}
                        alt={`Campaign ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </>
              ))}
            </motion.div>
          ) : (
            // 🔴 Mobile (Vertical Scrolling)
            <div className="h-[900px] overflow-hidden flex flex-col items-center">
              <motion.div
                className="flex flex-col space-y-6"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                }}
              >
                {infiniteCampaigns.map((src, index) => (
                  <>
                    <Link to="/explore" onClick={() => window.scrollTo(0, 0)}>
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg flex-shrink-0"
                        style={{ width: "300px", height: "250px" }}
                      >
                        <img
                          src={src}
                          alt={`Campaign ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                  </>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingCampaigns;
