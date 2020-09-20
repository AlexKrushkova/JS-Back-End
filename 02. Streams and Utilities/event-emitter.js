class EventEmitter {
    constructor() {
        this.subscriptions = {};
    }

    on(eventName, cb) {
        this.subscriptions[eventName] = 
        (this.subscriptions[eventName] || []).concat([cb]);
    }

    emit(eventName, data) {
        (this.subscriptions[eventName] || []).forEach(cb => {
            cb(data);
        })
    }
}

const emitter = new EventEmitter();

emitter.on('some-event', console.log);
// ...
emitter.on('some-event', console.log);
// ...
emitter.emit('some-event', { data: 123 });