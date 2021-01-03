import { Selector } from 'testcafe';

export class FeedBackPageObject{
    private readonly _emailInput           = Selector('#email');
    private readonly _appRatingSelect      = Selector('#rating');
    private readonly _optionToSelect       =  Selector("option");
    private readonly _feedbackInput        = Selector('#feedback');
    private readonly _successAlert         = Selector('.alert.alert-success');
    private readonly _emailValidationLabel = Selector('label').withText('Email');
    private readonly _submitBtn            = Selector('.e2e-send-feedback-btn');
    private readonly _errorMessage         = Selector(".alert.alert-danger");
    private readonly _successMessage       = Selector(".alert.alert-success");
    
    public async fillForm(t: TestController, email: string, rating: string, feeback?: string){
        await t.typeText(this._emailInput, email);
        await t.click(this._appRatingSelect).click(this._optionToSelect.withText(rating));
        if(feeback){
            await t.typeText(this._feedbackInput, feeback);
        }
    }

    public async sendFeeback(t: TestController){
        await t.click(this._submitBtn);
    }

    public get successAlert(): Promise<boolean>{
        return this._successAlert.exists;
    }

    public get successMessage(): Promise<string>{
        return this._successMessage.innerText;
    }

    public get errorMessage(): Promise<string>{
        return this._errorMessage.innerText;
    }

    public get emailInvalidMessage() : Promise<boolean>{
        return this._emailValidationLabel.exists;
    }
}