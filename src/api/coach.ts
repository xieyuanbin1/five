import axios from './index'

export interface Coach {
  id: string;
  name: string;
  sex: number;
  phone: string;
}

export interface AddCoach {
  name: string;
  sex: number;
  phone: string;
}

export const apiGetCoach = () => {
  return axios.get<Coach[]>('/wu/Coach', {});
}

export const apiAddCoach = (params: AddCoach) => {
  return axios.post<any>('/wu/coach/add', params);
}

export const apiDeleteCoach = (id: number) => {
  return axios.post<any>('/wu/coach/del', {id});
}
