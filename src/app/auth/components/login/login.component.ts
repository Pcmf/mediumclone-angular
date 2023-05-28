import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { RouterLink } from '@angular/router';


@Component({
    selector: 'mc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        BackendErrorMessagesComponent
    ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  public onSubmit() {
    console.log('onSubmit', this.form.value);
    const request: LoginRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.login({request}));
  }
}
