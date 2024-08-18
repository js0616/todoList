# todoList
- todoList 만드는 중입니다... 
- vanilla javaScript 사용 SPA 구현
- 환경 설정 : webpack + babel + sass + esLint + preitter 


---
### 요구사항
https://velog.io/@hjoo3355/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9-%EC%A0%95%EB%A6%AC

해당 사이트에서 참고 하였습니다.

- 제한사항
    * ~~순수 자바스크립트로만 구현~~
    * ~~SPA 로 구현하기~~
    * ~~SCSS 전처리기 사용~~
    * ~~Babel 과 Webpack 으로 환경 세팅~~
    * ~~Prettier & ESLint 적용~~

- 필수구현
   * ~~입력폼 구현~~
   * ~~입력에는 제목과 내용을 입력할 수 있다.~~
   * ~~둘중 하나라도 값이 없는경우 사용자에게 알려줘야 한다.~~
   * ~~alert 또는 입력창 하단에 문구 노출 방식~~
   * ~~첫 페이지가 렌더링 되었을때 제목에 포커스가 맞춰져야 한다.~~
   * ~~제출은 키보드의 Enter 를 누르거나 입력 버튼을 누르면 제출이 되어야 한다.~~
   * ~~제출 후에는 입력값들이 초기화 되어야 한다.~~
   * ~~제출 후 할일 목록에 티켓이 생성되고 티켓에는 제목, 내용, 제출 시간이 표시되어야 한다.~~

- 목록 구현
    * ~~목록은 총 세가지필드가 존재한다. 할일 / 진행중 / 종료~~
    * ~~할일 / 진행중 에 등록된 티켓은 수정 및 삭제가 가능하다.~~
    * ~~할일 / 진행중 / 종료 로 서로간에 이동이 가능하다.~~
    * ~~각 티켓에는 제목, 내용, 제출 또는 수정날짜가 나타나야 한다.~~
    * 수정버튼을 눌렀을때 수정모달이 띄워져야 한다.

- 모달 구현
    * 할일 / 진행중에 수정버튼 또는 아이콘을 누르면 모달창이 떠야한다.
    * 모달창은 X 버튼을 누르거나 모달 바깥영역을 선택하거나 키보드의 ESC 를 누르면 닫혀야 한다.
    * 모달창은 입력폼과 동일하게 제목과 내용이 입력가능하다.
    * 각 입력창에는 수정하기 이전의 티켓 내용이 입력되어 있어야 한다.
    * validator 나 시간은 입력폼과 동일한 스펙을 갖는다.

- 선택구현
    * 티켓을 드래그 & 드롭으로 이동 가능하다.
    * ~~수정을 클릭하면 모달이 아닌 현재 티켓내에서 입력폼이 나타나고 수정 가능하다.~~
    * 순수 자바스크립트로 구현할때 각각 객체지향과 함수지향 형태로 만들어 본다.
    * 리액트의 클래스컴포넌트와 함수형 컴포넌트로 각각 다시 구현해본다.
    * 삭제할때 여러 티켓을 한꺼번에 삭제할 수 있다. (교차 삭제가 아닌 선택한 목록필드 내에서만)
    * 할일 목록을 생성할때 태그를 입력하여 생성할 수 있다.
    * 입력한 태그만 따로 모아보기를 할 수 있다.
    * 타입스크립트 적용
    * 테스트코드작성
    * 여러 구성원의 투두리스트를 관리할 수 있도록 개발

- 그 외 추가한 기능
  * ~~각 Item 의 갯수~~
    

- 구현이 아직 안된 기능
  * 삭제
  * 정렬
  * scss 작성
  * 

---
### history

- 8/7 : 요구사항 확인 /  scss 공부 
- 8/8 :  js 로 spa 구현 /
- 8/10 : js 로 spa 구현 - 컴포넌트 
- 8/11 : babel / webpack  공부 및 개발 환경 세팅
- 8/12 : + Prettier / ESLint 공부 및 개발 환경 세팅
- 8/13 : babel webpack sass img html prettier eslint  진짜진짜 최종 세팅 
- 8/16 : todolist 개발시작 ...
- 8/17 : 필수 구현 완료
- 8/18 : 목록 구현
- 8/19 :

---
### blog
https://js0616.tistory.com/category/%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%ED%95%B4%EB%B3%B4%EA%B8%B0/TodoList
