import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
export class ArticleFormComponent implements OnInit {
    @Input() initialValues?: ArticleFormValuesInterface;
    @Input() isSubmiting: boolean = false;
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
        this.initialForm();
    }


    initialForm() {
        if(this.initialValues) {
            this.form.patchValue({
                title: this.initialValues.title,
                description: this.initialValues.description,
                body: this.initialValues.body,
                tagList: this.initialValues.tagList.join(' '),
            })
        }
    }

    onSubmit() {
        const formValue = this.form.getRawValue();
        const articlesFormValues: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' '),
        }
        this.articlesSubmit.emit(articlesFormValues);
    }
}