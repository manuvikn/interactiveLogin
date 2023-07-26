import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentBoxService {

    message$: BehaviorSubject<string> = new BehaviorSubject('Welcome to the interactive login project!');

    constructor() {}

    getMessage(): Observable<string> {
        return this.message$.asObservable().pipe(filter(message => message != ''));
    }

    setMessage(message: string): void {
        this.message$.next( message );
    }

}