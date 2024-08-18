// src/app.js
// state , method 관리

import Component from './core/Component.js';
import ItemList from './components/ItemList.js';
import ItemAdd from './components/ItemAdd.js';
import ItemFilter from './components/ItemFilter.js';

export default class App extends Component {
  // 초기 state
  setup() {
    this.state = {
      items: [
        {
          seq: 1,
          title: '선배!!',
          contents: '마라탕 사주세요',
          date: '2024.08.17. 02:43',
          workState: 'wait',
          write: false,
        },
        {
          seq: 2,
          title: '그럼 혹시..',
          contents: '탕후루도 같이?',
          date: '2024.08.17. 02:45',
          workState: 'wait',
          write: false,
        },
      ],
      filterVal: 'all',
      workCount: {
        all: 0,
        wait: 0,
        going: 0,
        end: 0,
      },
    };
  }

  // 자식 컴포넌트가 위치할 dom 요소
  template() {
    return `
    <div data-component="itemAdd"></div>
    <div data-component="itemFilter"></div>
    <div data-component="itemList" class="itemList"></div>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트
  mounted() {
    const {
      addItem,
      currentTime,
      inputFocus,
      updateItem,
      setFilter,
      setWorkCount,
    } = this;

    const $itemList = this.$target.querySelector('[data-component="itemList"]');
    const $itemAdd = this.$target.querySelector('[data-component="itemAdd"]');
    const $ItemFilter = this.$target.querySelector(
      '[data-component="itemFilter"]',
    );

    // new 컴포넌트명('DOM'위치 , 전달할 props)
    new ItemList($itemList, {
      items: this.state.items,
      filterVal: this.state.filterVal,
      updateItem: updateItem.bind(this),
      currentTime: currentTime.bind(this),
      setWorkCount: setWorkCount.bind(this),
      inputFocus: inputFocus.bind(this),
    });
    new ItemAdd($itemAdd, {
      items: this.state.items,
      addItem: addItem.bind(this),
      currentTime: currentTime.bind(this),
      inputFocus: inputFocus.bind(this),
      setWorkCount: setWorkCount.bind(this),
    });
    new ItemFilter($ItemFilter, {
      workCount: this.state.workCount,
      setFilter: setFilter.bind(this),
    });
  }

  /** setState 함수 */
  // 추가하기
  addItem(NewContent) {
    const items = [...this.state.items];
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const { title, contents, date, workState, write } = NewContent;

    this.setState({
      items: [...items, { seq, title, contents, date, workState, write }],
    });
  }

  // 수정하기
  updateItem(NewContent) {
    const items = [...this.state.items];
    const { seq, title, contents, date, workState, write } = NewContent;

    items.map(item => {
      return item.seq == seq
        ? {
            seq: seq,
            title: title,
            contents: contents,
            date: date,
            workState: workState,
            write: write,
          }
        : item;
    });

    this.setState(items);
  }

  // 필터 값 변경
  setFilter(NewValue) {
    this.setState({
      filterVal: NewValue,
    });
  }

  // setWorkCount : workState 의 갯수를 workCount 에 전달
  setWorkCount() {
    let NewCount = { all: 0, wait: 0, going: 0, end: 0 };
    this.state.items.map(item => {
      NewCount['all']++;
      NewCount[item.workState]++;
    });
    this.setState({
      workCount: NewCount,
    });
  }

  /** 일반함수 */
  // focus 하기
  inputFocus(focusSelector) {
    let newFocus = document.querySelector(focusSelector);
    newFocus.focus();
  }

  // 현재 시간
  currentTime() {
    const now = new Date();

    // 사용자 정의 형식 (예: YYYY-MM-DD HH:MM:SS)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
    return formattedDate;
  }
}
