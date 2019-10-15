# Class Stub and Mocking

## Don't

```js
const Hello = class {};

const AoiComponentModelStub = sinon.createStubInstance(Hello);
```

`createStubInstance` automatically create object not class.

## Do

```js
const AoiComponentModelStub = class {
  public static findById: sinon.SinonStub;
}
AoiComponentModelStub.findById = sinon.stub()

it('should call find', () => {
  ctrl.findById(reqStub, resStub)
  expect(AoiComponentModelStub.findById.callCount).to.be.equal(1);
})
```

## Or Do

```js
const AoiComponentModelStub = mongoose.Model;

it('should call find', () => {
  const mock = sinon.mock(AoiComponentModelStub);
  mock.expects('findById').calledOnce;
  mock.verify();
});
```

# Unsolved Problem

How to replace mock with express.mock

```js
const res = class {
  status(): any {
  }
  json(): any {
  }
};

const resStub = sinon.createStubInstance(res, {
  status: sinon.stub().returnsThis()
});
```

```js
// will be replaced
const resStub = sinon.stub(express.response, 'status').returnsThis(); // not work. in typescript
```

# 다른 상황들
```js
# case3 https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
const namespace = {
  Service: require('../../ctrl')
}
console.log(namespace);
```
