import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { CommentBoxService } from "./comment-box.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit, OnDestroy {

    @Output() destroyCommentBox: EventEmitter<void> = new EventEmitter();
    @ViewChild('commentBox') commentBox: ElementRef | undefined;

    message: string = '';
    messageSubscription: Subscription | undefined;
    timeOutID: any;

    constructor(private commentBoxService: CommentBoxService) {}

    ngOnInit(): void {
        this.commentBoxService.getMessage()
            .subscribe((message: string) => {
                this.message = message;
                if (this.timeOutID) window.clearTimeout( this.timeOutID );
                this.hideCommentBox();
            });
    }

    hideCommentBox(): void {
        this.timeOutID = setTimeout(() => {
            this.commentBox?.nativeElement.classList.remove('animate__fadeIn');
            this.commentBox?.nativeElement.classList.add('animate__fadeOut');
            this.destroyCommentBox.emit();
        }, 4000);
    }

    ngOnDestroy(): void {
        this.messageSubscription?.unsubscribe();
    }

}