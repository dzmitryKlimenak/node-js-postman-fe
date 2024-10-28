import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // Adjust path to your environment

@Component({
  selector: 'app-api-form',
  templateUrl: './api-form.component.html',
  styleUrls: ['./api-form.component.scss'],
})
export class ApiFormComponent implements OnInit {
  apiForm!: FormGroup;
  errorMessage = '';

  @Output() apiSaved = new EventEmitter<void>(); // Emit when an API is saved

  @Input() set selectedApi(api: any) {
    if (api) {
      this.setFormValues(api); // Populate form with selected API
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.apiForm = this.fb.group({
      method: ['GET', Validators.required],
      url: ['', Validators.required],
      headers: this.fb.array([]),
      body: [''],
      params: this.fb.array([]),
      withCredentials: [false],
      reportProgress: [false]
    });
  }

  setFormValues(api: any): void {
    this.apiForm.patchValue({
      method: api.method,
      url: api.url,
      body: api.options?.body || '',
      withCredentials: api.options?.withCredentials || false,
      reportProgress: api.options?.reportProgress || false
    });

    this.headers.clear();
    if (api.options?.headers) {
      for (const [key, value] of Object.entries(api.options.headers)) {
        this.headers.push(this.fb.group({ key: [key, Validators.required], value: [value, Validators.required] }));
      }
    }

    this.params.clear();
    if (api.options?.params) {
      for (const [key, value] of Object.entries(api.options.params)) {
        this.params.push(this.fb.group({ key: [key], value: [value] }));
      }
    }
  }

  onSubmit(): void {
    this.errorMessage = ''; // Clear previous errors
    if (this.apiForm.valid) {
      const formData = this.apiForm.value;

      this.http.post(`${environment.apiUrl}/api/save`, formData).subscribe(
        () => {
          this.apiSaved.emit(); // Emit event when API is successfully saved
        },
        (error) => {
          if (error.status === 400) {
            this.errorMessage = error.error.message;
          } else {
            console.error('Error saving form data:', error);
          }
        }
      );
    }
  }

  resetForm(): void {
    this.apiForm.reset({
      method: 'GET',
      url: '',
      body: '',
      withCredentials: false,
      reportProgress: false
    });
    this.headers.clear();
    this.params.clear();
  }

  get headers(): FormArray {
    return this.apiForm.get('headers') as FormArray;
  }

  get params(): FormArray {
    return this.apiForm.get('params') as FormArray;
  }

  addHeader(): void {
    this.headers.push(this.fb.group({ key: ['', Validators.required], value: ['', Validators.required] }));
  }

  addParam(): void {
    this.params.push(this.fb.group({ key: ['', Validators.required], value: ['', Validators.required] }));
  }

  removeHeader(index: number): void {
    this.headers.removeAt(index);
  }

  removeParam(index: number): void {
    this.params.removeAt(index);
  }
}
