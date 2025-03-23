import { createContext, useState, useEffect } from "react";
import * as authApi from "./Auth/authApi";
import * as campaignApi from "./Campaign/campaignApi";
import * as contactApi from "./Communication/contactApi";
import * as paymentApi from "./Payment/paymentApi";
import * as commentApi from "./Communication/commentApi";
import * as messageApi from "./Communication/messageApi";
import * as reportApi from "./Communication/reportApi";
import * as adminApi from "./Admin/adminApi";

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.getUser();
        setUser(data?.data);
        
        if (data?.data?.status !== "active") {
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const apis = {
    authApi,
    campaignApi,
    contactApi,
    paymentApi,
    commentApi,
    messageApi,
    reportApi,
    adminApi,
    user, 
    setUser,
  };

  return <ApiContext.Provider value={apis}>{children}</ApiContext.Provider>;
};

export { ApiContext };
