// ./src/core/Component.js
export default class Component {
  $target; // 부모, 컴포넌트가 위치할 DOM 요소
  props; // 전달하는 요소
  state; // 상태
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
    this.loaded();
  }
  setup() {} // 초기 상태를 설정
  mounted() {} // render 이후 동작
  template() {} // 보여줄 내용
  render() {
    // 렌더링
    this.$target.innerHTML = this.template();
    this.mounted(); //  render 후에 mounted가 실행 된다.
  }
  setEvent() {} // 이벤트 작성
  loaded() {} // 페이지 loading 이후 실행
  setState(newState) {
    // 상태 업데이트
    this.state = { ...this.state, ...newState };
    this.render();
  }

  /** 행동, 선택자, 콜백함수 */
  addEvent(eventType, selector, callback) {
    // const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, event => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
