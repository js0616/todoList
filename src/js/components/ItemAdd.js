// src/components/ItemAdd.js
// 입력UI 와 입력기능

import Component from '../core/Component.js';

export default class ItemAdd extends Component {
  template() {
    return `
      <input class='title' name='title' placeholder="제목" autocomplete="off" />
      <input class='contents' name='content' placeholder="내용" autocomplete="off" />
      <button class='addBtn' type='button'>제출</button>
      <div class='error'></div>
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

      if (title == '' || contents == '') {
        // error 처리
        error.innerHTML = '입력 값을 확인해 주세요';
      } else {
        // state 추가
        addItem({
          title: title,
          contents: contents,
          date: date,
        });

        inputFocus('.title');
        setWorkCount();
        setSort();
      }
    };

    // 초기 focus
    inputFocus('.title');

    // 클릭 이벤트
    this.addEvent('click', '.addBtn', () => {
      inputCheck();
    });

    // enter키 이벤트
    this.addEvent('keyup', '.title, .contents', e => {
      if (e.key === 'Enter') {
        inputCheck();
      }
    });
  }
}
