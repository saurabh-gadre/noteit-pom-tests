import { Selector } from 'testcafe';
import { LoginPageObject } from '../pageobjects/login.po';
import { NotesPageObject } from './../pageobjects/notes.po';
import { FeedBackPageObject } from './../pageobjects/feedback.po';

const loginPage = new LoginPageObject();
const notesPage = new NotesPageObject();
const feedbackPage = new FeedBackPageObject();

fixture("Feedback Fixture")
    .page("http://localhost:4200/")
    .beforeEach(async (t) => {  
        await t.maximizeWindow(); 
        console.log("Before Each - Test");
        await loginPage.loginWithRedirect(t, "feedback");
    })
    .afterEach(async (t) => {  
        await loginPage.logout(t); 
        console.log("Affter Each - Test");
});

test('should allow user to submit Feedback ',async (t: TestController) => {
    await feedbackPage.fillForm(t,"john.doe@testmail.com","Average", "Needs work" );
    await feedbackPage.sendFeeback(t);
    await t.expect(feedbackPage.successAlert).ok();
    await t.expect(feedbackPage.successMessage).contains("Thank you! Your feedback is on it's way to us :)");
    console.log("Test Complete");
});

test('should display error when email is invalid',async (t: TestController) => {
    await feedbackPage.fillForm(t,"jane.doe","Good", "Good Work" );
    await feedbackPage.sendFeeback(t);
    await t.expect(feedbackPage.successAlert).notOk();
    await t.expect(feedbackPage.emailInvalidMessage).ok();
    await t.expect(feedbackPage.errorMessage).contains("The form contains validation errors :(");
    console.log("Test Complete");
});
