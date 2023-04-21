import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { PolicyType, PrintResponseType } from 'types';

const URL_BASE = 'https://cosmickiosk.com/policiesapi';

const getPolicies = async () => {
  let response: AxiosResponse<PolicyType[]> | null = null;
  try {
    response = await axios.get(`${URL_BASE}/policies`);
    return {
      data: response ? response.data : null,
      error: false,
    };
  } catch(e) {
    return {
      data: null,
      error: true,
    };
    // return {
    //   data: [
    //     {
    //       "description": "Formato de reembolso vida más",
    //       "name": "Formato de reembolso vida más",
    //       "policy_id": 1,
    //     },
    //     {
    //       "description": "Formato de reembolso",
    //       "name": "Formato de reembolso",
    //       "policy_id": 2,
    //     },
    //     {
    //       "description": "Formato único de información bancaria",
    //       "name": "Formato único de información bancaria",
    //       "policy_id": 3
    //     }
    //   ],
    //   error: false,
    // }
  }
};

const printPolicy = async (id: string) => {
  let response: AxiosResponse<PrintResponseType> | null = null;
  try {
    response = await axios.get(`${URL_BASE}/print/policy_id/${id}`);
    return {
      data: response ? response.data : null,
      error: false,
    };
  } catch(e) {
    return {
      data: null,
      error: true,
    };
    // return {
    //   data: {
    //     "job_number": 47,
    //     file: "/home/pi/Documents/policies/FormatoDeReembolsoVidaMas.pdf",
    //     printing: "OK",
    //   },
    //   error: false,
    // }
  }
}

export {
  getPolicies,
  printPolicy,
}