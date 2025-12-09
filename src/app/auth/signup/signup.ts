import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../shared/auth';
import { AdminDashboard } from '../../admin/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupData = {
    email: '',
    fullName: '',
    phone: '',
    state: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSignup() {

    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser: AppUser = {
      email: this.signupData.email,
      fullName: this.signupData.fullName,
      phone: this.signupData.phone,
      state: this.signupData.state,
      password: this.signupData.password,
      role: this.signupData.isAdmin ? 'admin' : 'user'
    };

    const result = this.auth.register(newUser);


    alert(result.message);

  
    if (result.success) {
      this.router.navigate([AdminDashboard]);
    }
  }

}
