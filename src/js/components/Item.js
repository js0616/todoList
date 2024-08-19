// src/components/Item.js

import Component from '../core/Component.js';
import ItemModal from './ItemModal.js';

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
      <button class='modalBtn'>모달</button>
      <div class='modal'></div>
    `;
  }
  setEvent() {
    const { item, updateItem, setWorkCount, inputFocus, deleteItem } =
      this.props;
    this.addEvent('click', '.updateBtn', () => {
      updateItem(item.seq, { write: true });
      inputFocus(`[data-Item${item.seq}] .upTitle`);
    });

    this.addEvent('change', '.workState', e => {
      updateItem(item.seq, { workState: e.target.value });
      setWorkCount();
    });

    this.addEvent('click', '.deleteBtn', () => {
      deleteItem(item.seq);
      setWorkCount();
    });

    this.addEvent('click', '.modal', () => {
      new ItemModal(
        this.$target.querySelector(`[data-Item${item.seq}] .modal`),
      );
    });
  }
}
