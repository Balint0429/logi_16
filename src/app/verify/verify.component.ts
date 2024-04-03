// verify.component.ts
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verificationCode: string = '';
  isVerifying: boolean = false;
  verificationError: string = '';

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  verifyAccount() {
    this.isVerifying = true;
    this.userAuthService.verifyAccount(this.verificationCode)
      .then(response => {
        // Handle successful verification, maybe display a success message
        console.log("Account verified successfully");
        // Redirect to dashboard or wherever appropriate
        this.router.navigateByUrl('/dashboard');
      })
      .catch(error => {
        this.isVerifying = false;
        // Handle verification error, display error message
        console.error("Error verifying account:", error);
        if (error.response && error.response.data && error.response.data.message) {
          this.verificationError = error.response.data.message;
        } else {
          this.verificationError = "An error occurred while verifying your account.";
        }
      });
  }
}
