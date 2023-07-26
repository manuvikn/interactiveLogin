import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommentBoxService } from "../comment-box/comment-box.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-interactive-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Output() hideEyes: EventEmitter<any> = new EventEmitter();
    @Output() modifyEyesPosition: EventEmitter<any> = new EventEmitter();

    loginForm: FormGroup | undefined;
    passwordVisibility: boolean = false;
    validatorDictionary: any = {
        pattern: 'must be a valid email address.',
        required: 'is required.',
    }

    constructor(private commentBoxService: CommentBoxService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: this.fb.control('', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.required]),
            password: this.fb.control('', [Validators.required])
        });
    }

    hideEyesFunction(hide: boolean): void {

        const leftArm = !this.passwordVisibility;
        this.hideEyes.emit({ hide, rightArm: true, leftArm });

    }

    changePasswordVisibility(event: MouseEvent, password: HTMLInputElement): void {

        event.preventDefault();
        this.passwordVisibility = !this.passwordVisibility;
        password.type = this.passwordVisibility ? 'text' : 'password';
        if (document.activeElement == password) {

            this.hideEyes.emit({ hide: !this.passwordVisibility, rightArm: false, leftArm: true });

        }

    }

    getTypingLinePosition(_event: Event, input: HTMLInputElement): void {

        // Appending element to the DOM after textarea
        input.insertAdjacentHTML('afterend', `<span id = 'dummy'>${input.value}</span>`);

        // Getting position info of the rectangles inside dummy element
        const dummy = document.getElementById('dummy');
        let rectangles = dummy!.getClientRects();

        let last = rectangles[rectangles.length - 1];

        // Getting position info of the textarea
        let text = input.getBoundingClientRect();

        // Setting coordinates
        let x = last.x + last.width;
        let y = text.y + text.height - last.height;

        // Removing dummy
        dummy!.remove();

        this.modifyEyesPosition.emit({ pageY: y, pageX: x });

    }

    onPasswordBlur(hide: boolean, control: string): void {
        this.hideEyesFunction(hide);
        this.validateControl(control);
    }

    validateControl(controlName: string): void {

        const control = this.loginForm?.get(controlName);
        if (!control || control.pristine || control.valid) return;

        const errors = control.errors || {};
        const message = new String(`The field ${controlName} `).concat(
            Object.keys(errors).map((error: string) => this.validatorDictionary[error]).join('\n')
        );

        this.launchCommentBox( message );

    }

    launchCommentBox(message: string): void {

        this.commentBoxService.setMessage(message);

    }

    submitLoginForm(event: Event): void {

        this.loginForm?.reset();
        this.launchCommentBox( 'You have logged in successfully!' );

    }

}