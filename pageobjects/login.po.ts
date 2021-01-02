import {Selector} from "testcafe";

export class LoginPageObject{
    private readonly _userNameInput = Selector("#username");
    private readonly _passwordInput = Selector("#password");
    private readonly _loginButton   = Selector("button").withAttribute("type","submit");
    private readonly _logoutButton  = Selector("button").withAttribute("type","submit").withText("Log out");
    private readonly _alertVisible  = Selector("div.alert.alert-info");
    private readonly _loginPageDiv  = Selector("div.container.login-container.e2e-login-page");
    private readonly _notesPageDiv  = Selector("div.container-fluid.e2e-notes-page");

    public async validateCorrectTextLoginPage(t: TestController){
        const userNamePlacholder  = this._userNameInput.getAttribute("placeholder");
        const passwordPlaceHolder = this._passwordInput.getAttribute("placeholder");
        const loginButtonText     = this._loginButton.innerText;

        await t.expect(userNamePlacholder).eql("Type username")
        await t.expect(passwordPlaceHolder).eql("Type password");
        await t.expect(loginButtonText).contains("Log in");
    }

    public async loginWithRedirect(t: TestController, redirectUrl?: string){
        await t.typeText(this._userNameInput, "john.doe");
        await t.typeText(this._passwordInput, "password123");
        await t.click(this._loginButton);
        if(redirectUrl){
            await t.navigateTo(redirectUrl);
        }
    }

    public async logout(t: TestController){
        await t.click(this._logoutButton);
    }

    public get alertVisible(): Promise<boolean>{
        return this._alertVisible.exists;
    }
    
    public get loginPageDiv(): Promise<boolean>{
        return this._loginPageDiv.exists;
    }

    public get notesPageDiv(): Promise<boolean>{
        return this._notesPageDiv.exists;
    }
}
