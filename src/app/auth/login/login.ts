import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../shared/auth';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData = {
    email: '',
    password: '',
    isAdmin: false
  };
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  onLogin() {
    const { email, password, isAdmin } = this.loginData;
    if(!email || !password) {
      alert('Please enter both email and password.');
      return;
    } 

    const result = this.auth.login(this.loginData.email, this.loginData.password);
    alert(result.message);

    if (result.success) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Login failed. Please check your credentials and try again.');
    }
    const user = this.auth.getCurrentUser();
    const realRole = user?.role;
    if(realRole === 'admin' && isAdmin) {
      this.router.navigate(['/admin']);
      return;
    }
    if(realRole === 'user' && !isAdmin) {
      this.router.navigate(['/user']);
      return;
    }
    if(realRole === 'admin' && !isAdmin) {
      alert('You are actually an ADMIN!!! Stop undermining the system.. Redirecting to Admin Dashboard');
      this.router.navigate(['/admin']);
      return;
    }
    if(realRole === 'user' && isAdmin) {
      alert('You are actually a USER!!! Stop undermining the system.. Redirecting to User Dashboard');
      this.router.navigate(['/user']);
      return;
    }
  }   
}