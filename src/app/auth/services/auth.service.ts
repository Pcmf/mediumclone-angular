import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RegistersRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/currentUserInterface";
import { Observable, map } from "rxjs";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "src/environments/environment.development";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient) {}

    getUser(response: AuthResponseInterface): CurrentUserInterface{
        return response.user;
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        return this.http.get<AuthResponseInterface>(environment.apiUrl + '/user')
        .pipe(
            map(this.getUser)
        );
    }

    register(data: RegistersRequestInterface) :Observable<CurrentUserInterface> {

        return this.http.post<AuthResponseInterface>(environment.apiUrl + '/users', data)
        .pipe(
            map(this.getUser)
        );
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {

        return this.http.post<AuthResponseInterface>(environment.apiUrl + '/users/login', data)
        .pipe(
            map(this.getUser)
        );
    }
}