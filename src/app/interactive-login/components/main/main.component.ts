import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, fromEvent } from "rxjs";
import { CommentBoxService } from "../comment-box/comment-box.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy {

    @ViewChild('leftPopEye') leftPopEye: ElementRef | undefined;
    @ViewChild('rightPopEye') rightPopEye: ElementRef | undefined;
    @ViewChild('leftEye') leftEye: ElementRef | undefined;
    @ViewChild('rightEye') rightEye: ElementRef | undefined;
    @ViewChild('leftArm') leftArm: ElementRef | undefined;
    @ViewChild('leftForearm') leftForearm: ElementRef | undefined;
    @ViewChild('rightArm') rightArm: ElementRef | undefined;
    @ViewChild('rightForearm') rightForearm: ElementRef | undefined;
    @ViewChild('mouth') mouth: ElementRef | undefined;

    mouseMoveSubscription: Subscription | undefined;
    sendMessageSubscription: Subscription | undefined;
    showCommentBox: boolean = false;

    constructor(private commentBoxService: CommentBoxService) { }

    ngAfterViewInit(): void {

        setTimeout(() => {
            this.mouseMoveSubscription =
                fromEvent<MouseEvent>(document, 'mousemove')
                    .subscribe(this.mouseMoveEvent.bind(this));

            this.sendMessageSubscription =
                this.commentBoxService.getMessage()
                    .subscribe(this.sendMessage.bind(this));

        });
    }

    ngOnDestroy(): void {
        this.mouseMoveSubscription?.unsubscribe();
        this.sendMessageSubscription?.unsubscribe();
    }

    mouseMoveEvent(event: MouseEvent) {

        const lE = this.leftEye?.nativeElement.getBoundingClientRect();
        const leftEyePosition = { x: lE.x, y: lE.y, height: lE.height, width: lE.width };

        const rE = this.rightEye?.nativeElement.getBoundingClientRect();
        const rightEyePosition = { x: rE.x, y: rE.y, height: rE.height, width: rE.width };

        const { pageY, pageX } = event;
        const mousePosition = { x: pageX, y: pageY };

        const variablesPerEye = {
            left: {
                eyePosition: leftEyePosition,
                popEye: this.leftPopEye?.nativeElement
            },
            right: {
                eyePosition: rightEyePosition,
                popEye: this.rightPopEye?.nativeElement
            }
        };


        this.changeEyesPositions(mousePosition, variablesPerEye['left']);
        this.changeEyesPositions(mousePosition, variablesPerEye['right']);

    }

    changeEyesPositions(mousePosition: { [key: string]: number }, eyeObject: { eyePosition: { [key: string]: number }, popEye: HTMLElement }): void {

        const { eyePosition, popEye } = eyeObject;

        this.logicToChangeEyesPositions('x', mousePosition, eyePosition, popEye);
        this.logicToChangeEyesPositions('y', mousePosition, eyePosition, popEye);

    }

    logicToChangeEyesPositions(axe: string, mousePosition: { [key: string]: number }, eyePosition: { [key: string]: number }, popEye: HTMLElement): void {

        const variables: { [key: string]: { [key: string]: string } } = {
            x: {
                style: 'left',
                position: 'width'
            },
            y: {
                style: 'top',
                position: 'height'
            }
        };

        const { style, position } = variables[axe];

        if (mousePosition[axe] < eyePosition[axe]) {

            (popEye.style as any)[style] = '1px';

        } else if (mousePosition[axe] > (eyePosition[axe] + eyePosition[position] - 4)) {

            (popEye.style as any)[style] = (eyePosition[position] - 6) + 'px';

        } else {

            (popEye.style as any)[style] = (mousePosition[axe] - eyePosition[axe]) + 'px';

        }

    }

    changeLookCheckStatus(hide: boolean, leftArm: boolean, rightArm: boolean): void {

        const index: number = hide ? 0 : 1;
        const dictionary = [
            { normal: 'add', reverse: 'remove' },
            { normal: 'remove', reverse: 'add' },
        ];

        if (leftArm) {
            this.leftArm?.nativeElement.classList[dictionary[index].normal]('move-left-arm');
            this.leftForearm?.nativeElement.classList[dictionary[index].normal]('move-left-forearm');
            this.leftArm?.nativeElement.classList[dictionary[index].reverse]('move-left-arm-reverse');
            this.leftForearm?.nativeElement.classList[dictionary[index].reverse]('move-left-forearm-reverse');
        }

        if (rightArm) {
            this.rightArm?.nativeElement.classList[dictionary[index].normal]('move-right-arm');
            this.rightForearm?.nativeElement.classList[dictionary[index].normal]('move-right-forearm');
            this.rightArm?.nativeElement.classList[dictionary[index].reverse]('move-right-arm-reverse');
            this.rightForearm?.nativeElement.classList[dictionary[index].reverse]('move-right-forearm-reverse');
        }

    }

    manageHidingEyes({ hide, leftArm, rightArm }: any): void {

        this.changeLookCheckStatus(hide, leftArm, rightArm);

    }

    sendMessage(_message: string): void {

        this.showCommentBox = true;
        this.mouth?.nativeElement.classList.add('animate-talking');

    }

    destroyCommentBox(): void {

        setTimeout(() => {
            this.mouth?.nativeElement.classList.remove('animate-talking');
            this.showCommentBox = false;
        }, 500);

    }

}