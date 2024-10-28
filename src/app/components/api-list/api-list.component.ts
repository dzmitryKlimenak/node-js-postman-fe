import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {ApiRequest} from '../../types';  // Import environment for API URL

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit, OnChanges {
  apiList: ApiRequest[] = [];

  @Input() refresh = false;  // Input to trigger list refresh
  @Output() apiSelected = new EventEmitter<ApiRequest>();  // Emit when an API is selected

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadApiList();  // Load the API list when component is initialized
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'] && this.refresh) {
      this.loadApiList();  // Reload the list when the refresh flag is set
    }
  }

  // Load the API list from the backend
  loadApiList(): void {
    this.http.get<ApiRequest[]>(`${environment.apiUrl}/api/load`).subscribe(  // Use environment.apiUrl
      (data) => {
        this.apiList = data;
      },
      (error) => {
        console.error('Error loading API list:', error);
      }
    );
  }

  // Emit the selected API to the parent component
  selectApi(api: ApiRequest): void {
    this.apiSelected.emit(api);
  }

  // Delete the API item by making a DELETE request to the backend
  deleteApi(api: ApiRequest): void {
    if (confirm(`Are you sure you want to delete the API with URL: ${api.url}?`)) {
      this.http.delete(`${environment.apiUrl}/api/delete?url=${encodeURIComponent(api.url)}`).subscribe(  // Use environment.apiUrl
        () => {
          console.log('API deleted successfully');
          this.loadApiList();  // Reload the API list after deletion
        },
        (error) => {
          console.error('Error deleting API:', error);
        }
      );
    }
  }
}
