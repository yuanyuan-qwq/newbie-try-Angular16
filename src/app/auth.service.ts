import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor(private router: Router) { }

  register(user: User): boolean {
    const existingUser = this.users.find(u => u.username === user.username || u.email === user.email);
    if (existingUser) {
      return false; // User already exists
    }
    this.users.push(user);
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
