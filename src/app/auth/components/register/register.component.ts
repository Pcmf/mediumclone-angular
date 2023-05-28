import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegistersRequestInterface } from '../../types/registerRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";


@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        CommonModule,
        BackendErrorMessagesComponent
    ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder, 
    private store: Store,
  ) {}


  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  public onSubmit() {
    console.log('onSubmit', this.form.value);
    const request: RegistersRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.register({request}));
  }
}
