import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  login(data: any): Promise<any> {
    let payload = {
      email: data.email,
      password: data.password
    };

    return axios.post('http://127.0.0.1:8000/api/login', payload);
  }
 
  register(data: any): Promise<any> {
    let payload = {
      felhasznalo_nev: data.userName,
      kereszt_nev: data.firstName,
      vezetek_nev: data.lastName,
      email: data.email,
      password: data.password,
    };

    return axios.post('http://127.0.0.1:8000/api/registration', payload);
  }
  verifyAccount(code: string): Promise<any> {
    let payload = {
      code: code
    };

    return axios.post('http://127.0.0.1:8000/api/verify', payload);
  }

  getUser(): Promise<any>{
 
    return axios.get('/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
 
  logout(): Promise<any>{
 
    return axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
}