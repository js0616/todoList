// src/components/ItemModal.js

import Component from '../core/Component.js';

export default class ItemModal extends Component {
  template() {
    return `
        <div class='modalBox'>
            <p>모달 창 입니다.</p>
            <button id="modalCloseButton">닫기</button>
        </div>
    `;
  }

  setEvent() {}
}
