ClientAssetTable 컴포넌트 같은 경우는 테스팅하기가 굉장히 까다로웠다. item data를 주입 받는 것이 아니라 created 단계에서 내부적으로 네트워크를 통해 item data를 가져오기 때문이다.

가장 쉬운 옵션으로는 production 코드를 수정해서 api에서 정의된 mock result를 내려주는 방식으로 수정해봤다. 작동은 되는걸 확인만하고 코드를 모두 지웠다. production에는 test 코드가 들어가서는 안된다. 다음은 테스트용 mock 서버를 하나 더 올리는 것이였는데 express static으로 자동화된 test에서 package를 설치하고 서버 기동을 하는 것이 부담스러웠다.

어떤 식으로든 client-asset-api에 mock을 주입하고 싶었는데 코드를 수정하지 않고 하기가 쉽지 않았다. 물론 rewire와 같은 것을 쓰면 될 것 같기는 했지만 결과적으로는 axios-mock-adpater라는 훌륭한 api mocking 패키지가 있어서 이걸 사용하였다.

```js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import json from "./api.mock.client-asset.json";

const mock = new MockAdapter(axios);
mock.onGet("/api/v1/client-assets").reply(200, {
  payload: json
});
```
