import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #AUTH_URL = `${environment.BASE_URL}/auth/login`;
  #httpClient: HttpClient = inject(HttpClient);

  login(username: string, password: string) {
    if (!username) {
      throw new Error('To login username is required');
    }
    if (!password) {
      throw new Error('To login email is required');
    }

    return this.#httpClient.post(
      this.#AUTH_URL,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
  }
}
