import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFailed: boolean = false;
  registrationSuccess: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  get f() { return this.registrationForm.controls; }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const user = {
        username: this.f['username'].value,
        email: this.f['email'].value,
        password: this.f['password'].value
      };

      if (this.authService.register(user)) {
        this.registrationSuccess = true;
        this.registrationFailed = false;
        setTimeout(() => this.router.navigate(['/login']), 1000); // await after 1 seconds navi to login
      } else {
        this.registrationFailed = true;
        this.registrationSuccess = false;
      }
    } else {
      this.registrationFailed = false;
      this.registrationSuccess = false;
      if (this.f['confirmPassword'].errors?.['mismatch']) {
        alert('Passwords do not match!');
      }
    }
  }
}
