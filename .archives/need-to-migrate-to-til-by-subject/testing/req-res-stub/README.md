* sinon을 쓰지 않는 이유.
  * stub, mock을 도와주는 것 뿐이지 이것이 주가 되서는 안된다.
  * 행위 검증이 필요없다면, 현재 단계에서는 상태 검증만 위주로 한다.
  * 생산성 ROI를 생각하자.
  * 가장 기본이 되는 것은 res.json({})이 호출 되었는지 안되었는지 이다.