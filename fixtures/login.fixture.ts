import { Selector } from 'testcafe';
import { LoginPageObject } from '../pageobjects/login.po'

const loginPage = new LoginPageObject();

fixture("Login Fixture")
    .page("http://localhost:4200/")
    .beforeEach(async (t) => {
        console.log("Before Each - Test");
    })
    .afterEach(async (t) =>  {
        console.log("Affter Each - Test");
});

test('should display info alert box', async (t: TestController) => {
    await t.expect(loginPage.alertVisible).ok();
    console.log("Test Complete");
});

test('should contain correct text for login form',async (t: TestController) => {
    await loginPage.validateCorrectTextLoginPage(t);
    console.log("Test Complete");
});

test('should allow user to login', async (t: TestController) => {
    await loginPage.loginWithRedirect(t, "notes");
    await t.expect(loginPage.notesPageDiv).ok();
    console.log("Test Complete");
});

test('should allow user to logout', async (t: TestController) => {
    await loginPage.logout(t);
    await t.expect(loginPage.loginPageDiv).ok();
    console.log("Test Complete");
}).before(async t => {await loginPage.loginWithRedirect(t, "notes")});
