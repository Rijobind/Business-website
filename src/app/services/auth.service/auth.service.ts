import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null>;

  constructor() {
    // Load user from localStorage on service initialization
    let savedUser: any = null;
    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        savedUser = JSON.parse(userStr);
      }
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      savedUser = null;
    }

    this.userSubject = new BehaviorSubject<any | null>(savedUser);
  }

  // Observable for async pipe
  get user$(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  // Current user value
  get currentUser(): any | null {
    return this.userSubject.value;
  }

  // Save user + token in BehaviorSubject and localStorage
  setUser(user: any, token: string) {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  // Clear user from BehaviorSubject and localStorage
  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
