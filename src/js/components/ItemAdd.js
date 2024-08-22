// src/components/ItemAdd.js
// 입력UI 와 입력기능

import Component from '../core/Component.js';

export default class ItemAdd extends Component {
  template() {
    return `
      <input class='title' name='title' placeholder="제목" autocomplete="off" />
      <div class='error'></div>
      <textarea class='contents' name='content' placeholder="내용" autocomplete="off" /></textarea>
      <button class='addBtn' type='button'>추가하기</button>
    `;
  }

  setEvent() {
    const { addItem, currentTime, inputFocus, setWorkCount, setSort } =
      this.props;

    let inputCheck = () => {
      let title = document.querySelector('.title').value;
      let contents = document.querySelector('.contents').value;
      let error = document.querySelector('.error');
      let date = currentTime();

      if (title == '') {
        // error 처리
        error.innerHTML = '제목을 입력해 주세요 !!';
        inputFocus('.title');
      } else {
        // state 추가
        addItem({
          title: title,
          contents: contents,
          date: date,
        });

        setWorkCount();
        setSort();
        inputFocus('.title');
      }
    };

    // 초기 focus
    // inputFocus('.title');

    // 버튼 클릭 이벤트
    this.addEvent('click', '.addBtn', () => {
      inputCheck();
    });

    // 제목 이벤트
    this.addEvent('keydown', '.title', e => {
      if (e.key === 'Enter') {
        inputCheck();
      }

      let error = document.querySelector('.error');
      if (e.target.value !== '') {
        error.innerHTML = '';
      }
    });
  }
}
