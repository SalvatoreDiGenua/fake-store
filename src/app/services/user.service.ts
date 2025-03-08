import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

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
}
