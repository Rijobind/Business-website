import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null>;

  constructor() {
    let savedUser: any = null;
    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        savedUser = JSON.parse(userStr);
      }
    } catch (e) {
      savedUser = null;
    }

    this.userSubject = new BehaviorSubject<any | null>(savedUser);
  }

  get user$(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  get currentUser(): any | null {
    return this.userSubject.value;
  }

  setUser(user: any, token: string) {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
