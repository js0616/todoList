// src/components/ItemModal.js

import Component from '../core/Component.js';

export default class ItemModal extends Component {
  template() {
    const { item } = this.props;
    return `
        <div class=mdInnerBox>
          <span class='mdCloseBtn'> X </span>
          <div> 
            <b> No. ${item.seq} </b> 
          </div>
          <div>
            제목
            <input class ='mdTitle' value = '${item.title}' >
          </div>
          <div>
            내용
            <input class ='mdContents' value = '${item.contents}' >
          </div>
          <div class='error'></div>
          <div>
            상태 : ${item.workState == 'wait' ? '대기중' : '진행중'}
          </div>
          <div>
            작성일 : ${item.date}
          </div>

          <div class ='mdBtn'> 
            <button class='mdupBtn'>수정</button>
          </div>
        </div>
    `;
  }

  setEvent() {
    const { item, updateItem, currentTime } = this.props;

    // X 버튼 , 배경 클릭시 모달 닫힘
    this.addEvent('click', '.mdCloseBtn, .modalBox', e => {
      // 내부 모달 클릭시에는 동작 안하도록
      ['modalBox', 'mdCloseBtn'].includes(e.target.classList.value)
        ? updateItem(item.seq, { modal: false })
        : '';
    });

    // esc 누를때, 모달 닫기
    this.addEvent('keyup', '.modalBox', e => {
      // console.log(e.key);
      if (e.key == 'Escape') {
        updateItem(item.seq, { modal: false });
      }
    });

    // 수정 버튼 클릭시
    this.addEvent('click', '.mdupBtn', () => {
      // dom
      let title = document.querySelector(
        `[data-Item${item.seq}] .mdTitle`,
      ).value;
      let contents = document.querySelector(
        `[data-Item${item.seq}] .mdContents`,
      ).value;
      let error = document.querySelector(`[data-Item${item.seq}] .error`);

      // 로직
      if (title == '' || contents == '') {
        error.innerHTML = '입력 값을 확인해 주세요';
      } else {
        updateItem(item.seq, {
          title: title,
          contents: contents,
          modal: false,
          date: currentTime(),
        });
      }
    });
  }
}
