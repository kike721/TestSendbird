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
    // return [
    //   {
    //     "description": "Formato de reembolso vida más",
    //     "name": "FormatoDeReembolsoVidaMas",
    //     "policy_id": 1,
    //   },
    //   {
    //     "description": "Formato de reembolso",
    //     "name": "FormatoDeReembolso",
    //     "policy_id": 2,
    //   },
    //   {
    //     "description": "Formato único de información bancaria",
    //     "name": "FormatoUnicoDeInformacionBancaria",
    //     "policy_id": 3
    //   }
    // ];
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
    //   "job_number": 47,
    //   file: "/home/pi/Documents/policies/FormatoDeReembolsoVidaMas.pdf",
    //   printed: "OK"
    // }
  }
}

export {
  getPolicies,
  printPolicy,
}