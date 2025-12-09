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
    const result = this.auth.login(this.loginData.email, this.loginData.password);
    alert(result.message);

    if (result.success) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Login failed. Please check your credentials and try again.');
    }
  }   
}