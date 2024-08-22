// src/components/ItemFilter.js
// 필터 버튼 , 필터 기능

import Component from '../core/Component.js';

export default class ItemFilter extends Component {
  template() {
    const { workCount, filterVal } = this.props;

    return `
        <button class='filterBtn ${filterVal == 'all' ? 'active' : ''}' value ='all'>전체(${workCount.all})</button>
        <button class='filterBtn ${filterVal == 'wait' ? 'active' : ''}' value ='wait'>대기중(${workCount.wait})</button>
        <button class='filterBtn ${filterVal == 'going' ? 'active' : ''}' value ='going'>진행중(${workCount.going})</button>
        <button class='filterBtn ${filterVal == 'end' ? 'active' : ''}' value ='end'>종료(${workCount.end})</button>
    `;
  }

  setEvent() {
    const { setFilter } = this.props;

    this.addEvent('click', '.filterBtn', e => {
      setFilter(e.target.value);
    });
  }
}
