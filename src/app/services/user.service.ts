import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #USER_URL = `${environment.BASE_URL}/users`;
  #httpClient: HttpClient = inject(HttpClient);

  getUser(idUser: number | string) {
    if (!idUser) {
      throw new Error('idUser is required');
    }

    return this.#httpClient.get<User>(`${this.#USER_URL}/${idUser}`, {
      withCredentials: true,
    });
  }

  getUserByToken(token: string) {
    if (!token) {
      throw new Error('token is required');
    }
    const tokenDecoded = jwtDecode(token);
    if (!tokenDecoded) {
      return null;
    }
    return this.getUser(tokenDecoded.sub);
  }
}
