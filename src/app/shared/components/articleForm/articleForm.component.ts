import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
// import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'
import {ArticleFormValuesInterface} from './types/articleFormValues.interface'
import { BackendErrorsInterface } from '../../backendErrors.interface'

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, CommonModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitting: boolean = false
  @Input() errors: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }
}



/* import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ArticleFormValuesInterface } from "./types/articleFormValues.interface";
import { BackendErrorsInterface } from "../../backendErrors.interface";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { BackendErrorMessagesComponent } from "../backendErrorMessages/backendErrorMessages.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'mc-article-form',
    templateUrl: './articleForm.component.html',
    standalone: true,
    imports: [
        BackendErrorMessagesComponent,
        ReactiveFormsModule,
        CommonModule,
    ]
})
export class ArticleFormComponent implements OnInit{

    @Input() initialValues: ArticleFormValuesInterface;
    @Input() isSubmitting: boolean = false;
    @Input() errors: BackendErrorsInterface | null = null;

    @Output() articlesSubmit = new EventEmitter<ArticleFormValuesInterface>();

    form = this.fb.nonNullable.group({
        title: '',
        description: '',
        body: '',
        tagList: '',
    })

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        console.log(this.initialValues, this.isSubmitting, this.errors);
        this.initializeForm();
    }

    initializeForm() {
        if(!this.initialValues) {
            throw new Error('Inputs not provided');
        }
        this.form.patchValue({
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' '),
        })
    }

    onSubmit() {
        const formValue = this.form.getRawValue();
        const articlesFormValues: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' '),
        }
        this.articlesSubmit.emit(articlesFormValues);
    }
} */