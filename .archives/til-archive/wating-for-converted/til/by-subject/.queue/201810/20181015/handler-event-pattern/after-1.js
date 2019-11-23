
// component
class Component {


  init() {
    const handlerInContainer = this.container.getMouseMoveHandler();
    this.addMouseMoveEvent(handlerInContainer);
  }

  addMouseMoveEvent (handler) {
    const eventHandlers = [];
    eventHandlers.push(handler);

    this.on('mousemove', function () {
      for(let handler of eventHandlers) {
        handler(this); // <-- this is event target object.
      }
    })
  }
}

// container
class Container {
  getMouseMoveHandler() {
    return function(eventTarget) {
      console.log(this); // expected output is undefined
      console.log(eventTarget); // expected output is event target object which is passed from event handler callback
    }
  }
}