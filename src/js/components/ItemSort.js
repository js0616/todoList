// src/components/ItemSort.js
// 정렬 기능

import Component from '../core/Component.js';

export default class ItemSort extends Component {
  template() {
    const { sortVal } = this.props;
    return `
        <div>
          정렬:
            <select name='sortBtn' class='sortBtn'>
                <option value='title' ${sortVal.type == 'title' ? 'selected' : ''}>제목</option>
                <option value='date'  ${sortVal.type == 'date' ? 'selected' : ''}>시간</option>
		    </select>
            <select name='sortBtn' class='sortBtn'>
                <option value='asc'  ${sortVal.way == 'asc' ? 'selected' : ''}>${sortVal.type == 'title' ? '오름차순' : '등록순'}</option>
                <option value='desc' ${sortVal.way == 'desc' ? 'selected' : ''}>${sortVal.type == 'title' ? '내림차순' : '최신순'}</option>
		    </select>
        </div>
        `;
  }

  setEvent() {
    const { setSortType, setSort } = this.props;

    this.addEvent('change', '.sortBtn', e => {
      setSortType(e.target.value);
      setSort();
    });
  }
}
