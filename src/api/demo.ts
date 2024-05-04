import axios from './index'

namespace Records {
  export interface RecordsList {
    pageSize?: number;
    pageNum?: number;
  }

  export interface RecordsAdd {
    aid: number;
    category: number;
    amount: number;
    type: number;
    remarks?: string;
    date?: string;
  }

  export interface RecordsResData {
    list: Record<string, any>;
    pageSize: number;
    pageNum: number;
    total: number;
  }
}

export const getRecords = (params?: Records.RecordsList) => {
  return axios.get<Records.RecordsResData>('/wu/record', params);
}

export const addRecords = (params: Records.RecordsAdd) => {
  return axios.post<number>('/wu/record/add', params);
}
