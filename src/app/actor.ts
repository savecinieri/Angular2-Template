export class Actor {
    id: number;
    completeName: string;
    detail: string;
    watcher: string;

    
    constructor(completeName: string, detail: string){
        this.completeName = completeName;
        this.detail = detail;
    }
    
}

export class ActorComplete{

    id: number;
    completeName: string;
    detail: string;
    watcher: string;

    constructor(completeName: string, detail: string, watcher: string){
        this.completeName = completeName;
        this.detail = detail;
        this.watcher = watcher;
    }
}
