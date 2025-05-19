// It is work with event driven programming 
// It provide micanisum for createing, emtting and handles events 
// This modual use eventEmitter class. which is the central part of this modual
// There are two key concept : 1) Event-driven-architecture 2) EventEmitter
// key feature of the event modual
// 1) you can emit event from emitter object
// 2) you can set up event listerner to react spaceific event 
// 3)you can remove event listner when they are not longer needed 
const EventEmitter = require('events');
const { eventNames, removeAllListeners } = require('process');
const eventEmitter = new EventEmitter();
function listener1() {
  console.log('Listener 1');
}

function listener2() {
  console.log('Listener 2');
}

eventEmitter.on('event1', listener1);
eventEmitter.on('event1', listener2);

eventEmitter.on('greet', (name, lastName) => {
  console.log(`hello,${name}!`);
  console.log(`hello,${lastName}!`);
});

let count = eventEmitter.listenerCount('event1');
console.log(`counter Events ${count}`);

eventEmitter.emit('event1');
eventEmitter.removeAllListeners('event1');

eventEmitter.emit('event1');
// eventEmitter.emit('event1');

let eventNamess = eventEmitter.eventNames();
console.log(`Event names: ${eventNamess.join(', ')}`);

eventEmitter.emit('greet', 'Parth', 'khambhadiya');
eventEmitter.emit('greet', 'Parth khambhadiya');
// eventEmitter.removeAllListeners('greet');
eventEmitter.emit('greet', 'Parth khambhadiya');
