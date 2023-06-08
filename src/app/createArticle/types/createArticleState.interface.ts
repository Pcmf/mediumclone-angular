import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";

export interface CreateArticleStateInterface{
    isSubmiting: boolean;
    validationErrors: BackendErrorsInterface | null;
}