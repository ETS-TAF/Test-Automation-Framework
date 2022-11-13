import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import { UserService } from '../_services/user.service';
import { User } from '../_model/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
 
 users : User[] = [];  

  creationForm: any = {
    name: null,
    owner: new User(),
    startDate: null,
    endDate: null
  };  

    loading = false;
    submitted = false;
  	errorMessage = '';
    
    constructor(
        private router: Router,
        private prjService: ProjectService,
        private userService: UserService
    ) {

    }

    ngOnInit(): void {
		this.userService.getUsers().subscribe({
		      next: data => {
		        this.users=data;
		      },
		      error: err => {
		        this.errorMessage = err.error.message;
		      }
		    });	
    }

    // convenience getter for easy access to form fields
    get f() { return this.creationForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.creationForm.invalid) {
            return;
        }

        this.loading = true;    this.prjService.saveProject(this.creationForm).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
    }
}
