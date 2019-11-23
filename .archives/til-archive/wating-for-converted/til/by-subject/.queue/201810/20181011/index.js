class Parent {

  constructor() {
    this._callMethod(); // expected output : hi i am from child
  }

  _callMethod() {
    console.log('hi i am from parent');
  }
}


class Child extends Parent {
  constructor() {
    super();
  }

  _callMethod() {
    console.log('hi i am from child');
  }
} 

const child = new Child();