/**
 * MultiEventProxy
 */
class MultiEventProxy {
    private events: string[];
    private allReadyCallback: any;
    private results;
    
    constructor(events: string[], allReadyCallback:any) {
        this.events = events;
        this.allReadyCallback = allReadyCallback;
        this.results = {};
    }
    
    Ready(event: string, result: any){
        this.results[event] = result;
        this.Check();
    }
    
    private Check(){
        for (var i = 0; i < this.events.length; i++) {
            var event = this.events[i];
            if (!this.results.hasOwnProperty(event)){
                return;
            }
        }
        this.allReadyCallback(this.results);
    }
}
