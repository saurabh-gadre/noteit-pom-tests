import { Selector } from 'testcafe';
import { LoginPageObject } from '../pageobjects/login.po';
import { NotesPageObject } from './../pageobjects/notes.po';

const loginPage = new LoginPageObject();
const notesPage = new NotesPageObject();

fixture("Notes Fixture")
    .page("http://localhost:4200/notes")
    .beforeEach(async (t) => {  
        await t.maximizeWindow(); 
        console.log("Before Each - Test");
        await loginPage.loginWithRedirect(t,"notes");
    })
    .afterEach(async (t) => {  
        await loginPage.logout(t); 
        console.log("Affter Each - Test");
});

test('should allow user to filter Notes', async (t: TestController) => {
    await notesPage.filterANoteByName(t, "Dentist");
    await t.expect(notesPage.noteCount).eql(1);
    console.log("Test Complete");
});

test('should allow user to delete Notes', async (t: TestController) => {
    await notesPage.deleteExistingNote(t);
    await t.expect(notesPage.noteCount).eql(4);
    console.log("Test Complete");
});