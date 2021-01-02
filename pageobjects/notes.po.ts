import {Selector} from "testcafe";

export class NotesPageObject{
    private readonly _searchInput     = Selector("input").withAttribute("placeholder","Search notes...");
    private readonly _noteCount       = Selector("app-note");
    private readonly _deleteThirdNote = Selector(".note-delete-btn").nth(2);

    public async filterANoteByName(t: TestController, name: string){
        await t.typeText(this._searchInput, name);
    }

    public async deleteExistingNote(t: TestController){
        await t.setNativeDialogHandler(() => true);
        await t.click(this._deleteThirdNote);
    }

    public get noteCount(): Promise<Number>{
        return this._noteCount.count;
    }
}
