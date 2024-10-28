import { Component } from '@angular/core';
import {ApiRequest} from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedApi: ApiRequest | null = null;

  // Reference to the api-list component
  refreshApiList = false;

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
