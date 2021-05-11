class EventEmitter {
  constructor() {
    this.callbacks = {};
  }

  on(event, cb) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(cb);
  }

  emit(event, data) {
    let cbs = this.callbacks[event];
    if (cbs) {
      cbs.forEach((cb) => cb(data));
    }
  }
 
  deleteOldEvents(event){
    let cbs = this.callbacks[event];
    if(cbs){
      cbs = cbs.slice(0, 1);
      this.callbacks[event] = cbs;
    }
  }
}

export default EventEmitter;
