import { Injectable } from '@angular/core';

export type UserRole = 'user' | 'admin';

export interface AppUser {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  state: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'app_current_user';

  private users: AppUser[] = [];
  private currentUser: AppUser | null = null;

  constructor() {
    this.loadFromStorage();
  }

  register(user: AppUser): { success: boolean; message: string } {
    const existing = this.users.find(u => u.email === user.email);

    if (existing) {
      return { success: false, message: 'Email already registered.' };
    }

    this.users.push(user);
    this.currentUser = user;
    this.saveToStorage();

    return { success: true, message: 'Registration successful.' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const found = this.users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }

    this.currentUser = found;
    this.saveToStorage();

    return { success: true, message: 'Login successful.' };
  }

  logout(): void {
    this.currentUser = null;
    this.saveToStorage();
  }

  getCurrentUser(): AppUser | null {
    return this.currentUser;
  }

  getCurrentRole(): UserRole | null {
    return this.currentUser?.role ?? null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  private saveToStorage(): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));
  }

  private loadFromStorage(): void {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    const currentUserJson = localStorage.getItem(this.CURRENT_USER_KEY);

    if (usersJson) {
      try {
        this.users = JSON.parse(usersJson);
      } catch {
        this.users = [];
      }
    }

    if (currentUserJson) {
      try {
        this.currentUser = JSON.parse(currentUserJson);
      } catch {
        this.currentUser = null;
      }
    }
  }
}
