export class Trigger {
    id: string = "";
    name: string = "";
    tag: any;
    events: any[] = [];
    actions: any[] = [];
    disabled: boolean = false;
    [key: string]: any;
}
