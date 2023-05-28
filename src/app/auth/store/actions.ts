import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegistersRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserInterface } from "src/app/shared/currentUserInterface";
import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";


export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegistersRequestInterface}>(),
        'Register success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>(),

        Login: props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: CurrentUserInterface}>(),
        'Login failure': props<{errors: BackendErrorsInterface}>(),

        Logout: emptyProps(),
        'Logout success': emptyProps(),

        'Get current user': emptyProps(),
        'Get current user success': props<{currentUser: CurrentUserInterface}>(),
        'Get current user failure': emptyProps(),
    }
})