import {Component, OnInit} from '@angular/core';
import {ApiRequest} from './types';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedApi: ApiRequest | null = null;

  // Reference to the api-list component
  refreshApiList = false;

  apiUrl = environment.apiUrl;  // Access the environment variable

  ngOnInit(): void {
    console.log('API URL:', this.apiUrl);  // You can use the environment variable in your component logic
  }

  // Handle the selection of an API from the list
  onApiSelected(api: ApiRequest): void {
    this.selectedApi = api;
  }

  // Handle the event when an API is saved in the form
  onApiSaved(): void {
    this.refreshApiList = true; // Trigger a refresh in api-list
    setTimeout(() => {
      this.refreshApiList = false; // Reset the refresh flag after the list is reloaded
    }, 100); // Small delay to allow change detection
  }
}
