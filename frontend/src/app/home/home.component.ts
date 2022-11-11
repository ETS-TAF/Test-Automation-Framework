import { Component, OnInit} from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Project } from '../_model/project.model';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'owner'];
  dataSource: any;
  isLoggedIn = false;
  
  constructor(private tokenStorageService: TokenStorageService, private projectService: ProjectService) { }

  ngOnInit(): void {
	this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.projectService.getProjects().subscribe({
      next: data => {
		this.dataSource = data;
      },
      error: err => {
        console.log(JSON.parse(err.error).message) ;
      }
    });
  }  
}

