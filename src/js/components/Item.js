// src/components/Item.js

import Component from '../core/Component.js';

export default class Item extends Component {
  template() {
    const { item } = this.props;

    return `
      <div class='title'>제목 : ${item.title} </div>
      <div class='contents'>내용 : ${item.contents} </div>
      <div class='date'>작성시간 : ${item.date.slice(0, -3)} </div>
      <select name="workState" class="workState">
        <option value='wait' ${item.workState === 'wait' ? 'selected' : ''}>할일</option>
        <option value='going' ${item.workState === 'going' ? 'selected' : ''}>진행중</option>
        <option value='end' ${item.workState === 'end' ? 'selected' : ''}>종료</option>
		  </select>
      <button class='updateBtn'>수정</button>
      <button class='deleteBtn'>삭제</button> 
    `;
  }
  setEvent() {
    const { item, updateItem, setWorkCount, inputFocus, deleteItem } =
      this.props;

    this.addEvent('click', '.updateBtn', () => {
      item.write = true;
      updateItem(item);
      inputFocus(`[data-Item${item.seq}] .upTitle`);
    });

    this.addEvent('change', '.workState', e => {
      item.workState = e.target.value;
      updateItem(item);
      setWorkCount();
    });

    this.addEvent('click', '.deleteBtn', () => {
      deleteItem(item.seq);
    });
  }
}
