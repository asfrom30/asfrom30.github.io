import Dependency from './dependency'
import Association from './association'

export default class {


  // this is dependency(의존)
  excuteTest() {
    const dependencyObj = new Dependency();
    dependencyObj.print();
  }

  // this is association(연관)
  excuteAssociation() {
    this.association = this.association || new Association(); // 레퍼런스를 계속 유지하고 있다..
    this.association.print();
  }

}