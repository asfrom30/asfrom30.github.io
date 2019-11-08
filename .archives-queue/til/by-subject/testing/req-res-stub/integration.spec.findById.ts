import { expect } from 'chai';
import * as sinon from 'sinon';
import express = require('express');
import { getSuccessTitle, getFailedTitle } from '../../../../../../test/integration/utils';


import { createRandomMongooseId } from '../../../../../../test/commons/utils/mongoose-helper';
const ctrl = require('../../ctrl');
import { getResStub, restore } from '../../../../../../test/integration/factory/StubFactory';

export default function () {
  describe(getSuccessTitle(), () => {
    let res: sinon.SinonStubbedInstance<express.Response>;
    before(() => {
      // res = sandbox.stub(express.response);
      res = getResStub();
      ctrl.findById({ id: createRandomMongooseId() }, res, function (err: Error) {
        throw err;
      });
    })

    it('should call res.json()', () => {
      // expect(resMock.json.calledOnce).to.be.true;
      // const res: = express.response;
      // expect(res.calledOnce).to.be.true;
      // res.restore();
      // expect(1).to.be.equal(1)
      // expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    })

    after(() => {
      // sandbox.restore();
      // express.response.json.reset();
      restore();
    })
  })
}

