// src/components/Item.js

import Component from '../core/Component.js';
import ItemModal from './ItemModal.js';

export default class Item extends Component {
  template() {
    const { item } = this.props;

    return `
      <div class='title'>${item.title}</div>
      <div class='contents'><pre>${item.contents}</pre></div>
      <div class='date'>작성시간 : ${item.date.slice(0, -3)} </div>
      <div class='btns'>
        <select name="workState" class="workState">
          <option value='wait' ${item.workState === 'wait' ? 'selected' : ''}>할일</option>
          <option value='going' ${item.workState === 'going' ? 'selected' : ''}>진행중</option>
          <option value='end' ${item.workState === 'end' ? 'selected' : ''}>종료</option>
        </select>
        ${
          item.workState == 'end'
            ? ''
            : "<button class='updateBtn'>수정</button> <button class='deleteBtn'>삭제</button> <button class='modalBtn'>모달</button>"
        }
      </div>
      ${item.modal ? "<div class='modalBox'></div>" : ''}
    `;
  }
  mounted() {
    const { item, updateItem, currentTime } = this.props;
    item.modal
      ? new ItemModal(
          this.$target.querySelector(`[data-Item${item.seq}] .modalBox`),
          {
            item: item,
            updateItem: updateItem,
            currentTime: currentTime,
          },
        )
      : '';
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

    this.addEvent('click', '.modalBtn', () => {
      updateItem(item.seq, { modal: true });
      inputFocus(`[data-Item${item.seq}] .mdTitle`);
    });
  }
}
