import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/currentUserInterface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    isLoading: boolean;
    validationErrors: BackendErrorsInterface | null;
}