
// Container 객체의 마우스 이벤트 행동을 Component에서 결정하는 것이 아니라.
// Continaer 객체에서 스스로 어떤 행동을 할지 결정을해서 핸들러로 넘겨주고 싶다.
// Component는 핸들러인지만 확인되면 실행하면 되고, 무엇을 실행하는지 알 필요가 없다.
// 행동코드가 Container로 들어간다.
// Component 객체가 여러개인 경우 각 객체에서 이벤트를 등록/해제가 자유롭다.
// 코드가 중복되지 않는다.

// component
class Component {



  addMouseMoveEvent() {
    const self = this;

    this.on('mousemove', function() {
      // this
      if(this.positionX < 0) {
        self.container.hide();
      }
    })
  }
}

// container
class Container {

  hide() {

  }
}