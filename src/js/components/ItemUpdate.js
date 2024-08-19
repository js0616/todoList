// src/components/ItemUpdate.js

import Component from '../core/Component.js';

export default class ItemUpdate extends Component {
  template() {
    const { item } = this.props;
    return `
        <div>제목 : <input class='upTitle' value='${item.title}' placeholder="제목" autocomplete="off" /> </div>
        <div>내용 : <input class='upContents' value='${item.contents}' placeholder="내용" autocomplete="off" /> </div>
        <div class='error'></div>
        <button class='upBtn'>수정완료</button>
    `;
  }

  setEvent() {
    const { item, updateItem, currentTime, setSort } = this.props;

    this.addEvent('click', '.upBtn', () => {
      // dom
      let title = document.querySelector(
        `[data-Item${item.seq}] .upTitle`,
      ).value;
      let contents = document.querySelector(
        `[data-Item${item.seq}] .upContents`,
      ).value;
      let error = document.querySelector(`[data-Item${item.seq}] .error`);

      // 로직
      if (title == '' || contents == '') {
        error.innerHTML = '입력 값을 확인해 주세요';
      } else {
        // title, contents, date,  + write
        let newItem = {
          title: title,
          contents: contents,
          date: currentTime(),
          write: false,
        };
        updateItem(item.seq, newItem);
        setSort();
      }
    });
  }
}
