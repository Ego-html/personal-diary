// src/app/services/auth.services.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('authToken', 'dummy-token');
      this.authState.next(true);
    } else {
      this.authState.next(false)
    }
    return this.authState.asObservable();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
