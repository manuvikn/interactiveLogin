import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { Subscription, fromEvent } from "rxjs";

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

    constructor() { }

    ngAfterViewInit(): void {

        this.mouseMoveSubscription =
            fromEvent<MouseEvent>(document, 'mousemove')
                .subscribe(this.mouseMoveEvent.bind(this));

    }

    ngOnDestroy(): void {
        this.mouseMoveSubscription?.unsubscribe();
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

    talk(): void {

        if (!this.mouth) return;
        this.mouth.nativeElement.classList.remove('animate-talking');
        setTimeout(() => {
            this.mouth!.nativeElement.classList.add('animate-talking');
        }, 100);

    }

    changeLookCheckStatus(event: Event): void {

        if (!event.target) return;
        const checked = (event.target as any).checked ? 1 : 0;
        const dictionary = [
            { normal: 'remove', reverse: 'add' },
            { normal: 'add', reverse: 'remove' }
        ];

        this.leftArm?.nativeElement.classList[dictionary[checked].normal]('move-left-arm');
        this.leftForearm?.nativeElement.classList[dictionary[checked].normal]('move-left-forearm');
        this.rightArm?.nativeElement.classList[dictionary[checked].normal]('move-right-arm');
        this.rightForearm?.nativeElement.classList[dictionary[checked].normal]('move-right-forearm');

        this.leftArm?.nativeElement.classList[dictionary[checked].reverse]('move-left-arm-reverse');
        this.leftForearm?.nativeElement.classList[dictionary[checked].reverse]('move-left-forearm-reverse');
        this.rightArm?.nativeElement.classList[dictionary[checked].reverse]('move-right-arm-reverse');
        this.rightForearm?.nativeElement.classList[dictionary[checked].reverse]('move-right-forearm-reverse');

    }

}