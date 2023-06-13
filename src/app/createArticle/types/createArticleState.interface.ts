import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";

export interface CreateArticleStateInterface{
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null;
}