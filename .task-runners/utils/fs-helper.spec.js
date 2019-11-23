const expect = require('chai').expect;
const { rename } = require('./fs-helper');
const fs = require('fs');

describe('fs-helper.js', () => {
  // option is copy true
  before(() => {
    rename('.test-resources/rename-target.js', '.test-resources', 'after-renamed.md', { copy: true });
  });

  it('should', () => {
    expect(fs.existsSync('.test-resources/after-renamed.md')).to.be.equal(true);
  });
});
