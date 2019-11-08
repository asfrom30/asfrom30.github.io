import * as sinon from 'sinon';
import * as express from 'express';

const sandbox = sinon.createSandbox();

export function getResStub() {
  sandbox.restore();
  const resStub = sandbox.stub(express.response);
  // @ts-ignore
  resStub.status = sinon.stub().returnsThis();
  return resStub;
}

export function restore() {
  sandbox.restore();
}
// export namespace Express {
//   export const resStub = resStub;
// }


// legacy
// @ts-ignore
// const resStub: sinon.SinonStubbedInstance<express.Response> = express.response;
// const resStub = sinon.stub(express.response);