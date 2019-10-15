// component
class Component {
  init() {
    const handlerInContainer = this.container.getMouseMoveHandler();
    this.addMouseMoveEvent(handlerInContainer);
  }

  addMouseMoveEvent(handler) {
    const eventHandlers = [];
    eventHandlers.push(handler);

    this.on('mousemove', function() {
      for (let handler of eventHandlers) {
        // if you want to keep the this context. use apply
        handler.apply(this);
      }
    });
  }
}

// container
class Container {
  getMouseMoveHandler() {
    return function(eventTarget) {
      console.log(this); // expected output is event target object which is passed from event handler callback
      console.log(eventTarget); // expected output is undefined
    };
  }
}
