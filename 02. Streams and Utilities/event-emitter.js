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

 const unsub1 = emitter.on('some-event', console.log);
// ...
const unsub2 = emitter.on('some-event', console.log);
// ...

setTimeout(() =>{
    emitter.emit('some-event', { data: 123 });
    emitter.once('some-event-2', console.log);
    unsub1();
    setTimeout(()=>{
        emitter.emit('some-event-2', { data: 456});
    }, 3000);
}, 1000);
