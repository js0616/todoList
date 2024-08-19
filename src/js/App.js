// src/app.js
// state , method 관리
import Component from './core/Component.js';
import ItemList from './components/ItemList.js';
import ItemAdd from './components/ItemAdd.js';
import ItemFilter from './components/ItemFilter.js';
import ItemSort from './components/ItemSort.js';

export default class App extends Component {
  // 초기 state
  setup() {
    this.state = {
      items: [
        {
          seq: 2,
          title: '그럼 혹시..',
          contents: '탕후루도 같이?',
          date: '2024.08.17. 02:45:00',
          workState: 'wait',
          write: false,
          modal: false,
        },
        {
          seq: 1,
          title: '선배!!',
          contents: '마라탕 사주세요',
          date: '2024.08.17. 02:43:00',
          workState: 'wait',
          write: false,
          modal: false,
        },
        {
          seq: 3,
          title: '웅나!',
          contents: '웅나나?',
          date: '2024.08.19. 20:00:00',
          workState: 'wait',
          write: false,
          modal: false,
        },
      ],
      filterVal: 'all',
      sortVal: {
        type: 'date',
        way: 'desc',
      },
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
    <div data-component="ItemSort"></div>
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
      deleteItem,
      setSortType,
      setSort,
    } = this;

    const $itemList = this.$target.querySelector('[data-component="itemList"]');
    const $itemAdd = this.$target.querySelector('[data-component="itemAdd"]');
    const $ItemFilter = this.$target.querySelector(
      '[data-component="itemFilter"]',
    );
    const $ItemSort = this.$target.querySelector('[data-component="ItemSort"]');

    // new 컴포넌트명('DOM'위치 , 전달할 props)
    new ItemList($itemList, {
      items: this.state.items,
      filterVal: this.state.filterVal,
      updateItem: updateItem.bind(this),
      currentTime: currentTime.bind(this),
      setWorkCount: setWorkCount.bind(this),
      inputFocus: inputFocus.bind(this),
      deleteItem: deleteItem.bind(this),
      setSort: setSort.bind(this),
    });
    new ItemAdd($itemAdd, {
      items: this.state.items,
      addItem: addItem.bind(this),
      currentTime: currentTime.bind(this),
      inputFocus: inputFocus.bind(this),
      setWorkCount: setWorkCount.bind(this),
      setSort: setSort.bind(this),
    });
    new ItemFilter($ItemFilter, {
      workCount: this.state.workCount,
      setFilter: setFilter.bind(this),
    });
    new ItemSort($ItemSort, {
      sortVal: this.state.sortVal,
      setSortType: setSortType.bind(this),
      setSort: setSort.bind(this),
    });
  }

  // 페이지 로딩 이후 1회만 실행할 기능
  loaded() {
    this.setWorkCount();
    this.setSort();
    console.log('loaded', this.state);
  }

  /** setState 함수 */
  // 추가하기
  addItem(NewContent) {
    const items = [...this.state.items];
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const { title, contents, date } = NewContent;

    this.setState({
      items: [
        ...items,
        {
          seq,
          title,
          contents,
          date,
          workState: 'wait',
          write: false,
          modal: false,
        },
      ],
    });
  }

  /** seq, {'key', NewVal} */
  updateItem(seq, NewItem) {
    // 깊은 복사 structuredClone 사용 -> IE 호환성 확인
    let items = structuredClone(this.state.items);
    let seqArray = items.map(item => item.seq);
    let updateIndex = seqArray.findIndex(item => item == seq);

    for (let key in NewItem) {
      items[updateIndex][key] = NewItem[key];
    }
    this.setState({ items: items });
  }

  // 삭제하기
  deleteItem(itemSeq) {
    // 삭제할 seq 번호를 가져오고 임시배열items 에서 제거 후 state 에 반영
    let items = [...this.state.items];
    let seqArray = this.state.items.map(item => item.seq);
    let delIndex = seqArray.findIndex(item => item == itemSeq);
    items.splice(delIndex, 1);
    this.setState({ items: items });
  }

  // 정렬 옵션
  setSortType(value) {
    let { type, way } = this.state.sortVal;

    if (['title', 'date'].includes(value)) {
      this.setState({ sortVal: { type: value, way: way } });
    } else {
      this.setState({ sortVal: { type: type, way: value } });
    }
  }

  // items 정렬
  setSort() {
    const { type, way } = this.state.sortVal;
    const items = [...this.state.items];
    let sorted_items = items.slice();
    // sorted_items.sort((item1, item2) => item1.seq - item2.seq); // 숫자
    sorted_items.sort((item1, item2) =>
      way == 'asc'
        ? item1[type].localeCompare(item2[type])
        : item2[type].localeCompare(item1[type]),
    );

    this.setState({ items: sorted_items });
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
    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
}
