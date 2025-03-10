import { createContext, useState } from 'react';
import * as authApi from './Auth/authApi';
import * as campaignApi from './Campaign/campaignApi';
import * as contactApi from './Communication/contactApi';
import * as paymentApi from './Payment/paymentApi';

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  // We can add additional state or logic here if needed.
  const [apis] = useState({
    authApi,
    campaignApi,
    contactApi,
    paymentApi
    // Here , we can add other API groups as well
  });

  return <ApiContext value={apis}>{children}</ApiContext>;
};

export { ApiContext };
