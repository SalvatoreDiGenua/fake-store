import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { NewUsersPayload, UpdateUserPayload, User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { isNullOrUndefined } from '../shared/utility/functions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #USER_URL = `${environment.BASE_URL}/users`;
  #httpClient: HttpClient = inject(HttpClient);

  getUser(idUser: number | string, withLoader = true) {
    if (!idUser) {
      throw new Error('idUser is required');
    }

    return this.#httpClient.get<User>(`${this.#USER_URL}/${idUser}`, {
      withCredentials: true,
      params: { withLoader },
    });
  }

  getUserByToken(token: string, withLoader = true) {
    if (!token) {
      throw new Error('token is required');
    }
    const tokenDecoded = jwtDecode(token);
    if (!tokenDecoded) {
      return null;
    }
    return this.getUser(tokenDecoded.sub, withLoader);
  }

  getAllUsers(withLoader = true) {
    return this.#httpClient.get<User[]>(this.#USER_URL, {
      withCredentials: true,
      params: { withLoader },
    });
  }

  addNewUser(payload: NewUsersPayload, withLoader = true) {
    if (isNullOrUndefined(payload)) {
      throw new Error('payload is required');
    }
    return this.#httpClient.post<User>(this.#USER_URL, payload, {
      withCredentials: true,
      params: { withLoader },
    });
  }

  updateUser(idUser: number, payload: UpdateUserPayload, withLoader = true) {
    if (isNullOrUndefined(idUser)) {
      throw new Error('idUser is required');
    }
    if (isNullOrUndefined(payload)) {
      throw new Error('payload is required');
    }

    return this.#httpClient.put<User>(`${this.#USER_URL}/${idUser}`, payload, {
      withCredentials: true,
      params: { withLoader },
    });
  }
}
