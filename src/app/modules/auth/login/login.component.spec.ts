import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { SharedModule } from "../../../shared/shared.module";
import { Validators } from "@angular/forms";

describe("LoginComponent", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [SharedModule]
        }).compileComponents();
    });

    it('should instance the LoginComponent', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('Email and password should be required.', () => {
        const fixture = TestBed.createComponent(LoginComponent).componentInstance;
        expect(fixture.loginForm.get('email')?.hasValidator(Validators.required)).toBeTrue();
    });

    it("if form is invalid it should mark all touched", () => {
        const fixture = TestBed.createComponent(LoginComponent).componentInstance;

        fixture.loginForm.setValue({
            email: '',
            password: ''
        });

        const spyOnMarkAllAsTouched = spyOn(fixture.loginForm, 'markAllAsTouched');

        fixture.onSubmit();

        expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1);
    });

    it("if form valid should call AuthService's login", () => {
        const fixture = TestBed.createComponent(LoginComponent).componentInstance;
        fixture.loginForm.setValue({
            email: 'mail@mail.com',
            password: '123456'
        });

        const spyOnLogin = spyOn((fixture as any).authService, 'login');

        fixture.onSubmit();

        expect(spyOnLogin).toHaveBeenCalledTimes(1);

    })
})