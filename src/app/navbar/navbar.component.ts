import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Navigate to the dashboard page
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Handle user logout
  logout() {
    this.authService.logout(); // Use AuthService to handle logout
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
