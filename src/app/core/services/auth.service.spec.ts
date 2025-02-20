import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        }).compileComponents();

        authService = TestBed.inject(AuthService);
    })

    it("should instantiate AuthService", () => {
        expect(authService).toBeTruthy();
    })
})