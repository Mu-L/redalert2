export class Locomotor {
    public ignoresTerrain: boolean = false;
    constructor() { }
    selectNextWaypoint(_gameObject: any, _waypoints: any[]): any {
    }
    onNewWaypoint(_gameObject: any, _waypoint: any, _extra?: any): void {
    }
    tick(_gameObject: any, _waypoint: any, _extra?: any, _extra2?: any): any {
        return { done: false };
    }
}
