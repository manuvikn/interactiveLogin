import { Component, EventEmitter, Output } from "@angular/core";
import { CommentBoxService } from "../comment-box/comment-box.service";

@Component({
    selector: 'app-interactive-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {

    @Output() hideEyes: EventEmitter<any> = new EventEmitter();
    @Output() modifyEyesPosition: EventEmitter<any> = new EventEmitter();
    
    passwordVisibility: boolean = false;

    constructor(private commentBoxService: CommentBoxService) { }

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

        this.launchCommentBox( 'Hello World!' );

    }

    launchCommentBox(message: string): void {

        this.commentBoxService.setMessage( message );

    }

}