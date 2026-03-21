import { ActionType } from './ActionType';
export abstract class Action {
    protected actionType: ActionType;
    public player: any;
    constructor(actionType: ActionType) {
        this.actionType = actionType;
    }
    unserialize(_data: any): void {
    }
    serialize(): Uint8Array {
        return new Uint8Array();
    }
    process(): void {
    }
    print(): string {
        return "";
    }
}
