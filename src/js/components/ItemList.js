// src/components/ItemList.js

import Component from '../core/Component.js';
import Item from './Item.js';
import ItemUpdate from './ItemUpdate.js';

export default class ItemList extends Component {
  template() {
    const { items, filterVal } = this.props;
    let ItemDiv = items.map(item => {
      return filterVal == 'all' || filterVal == item.workState
        ? `<div data-Item${item.seq} ></div>`
        : '';
    });

    return `
      ${ItemDiv.join('')}
    `;
  }
  mounted() {
    const {
      items,
      updateItem,
      currentTime,
      filterVal,
      setWorkCount,
      inputFocus,
    } = this.props;

    items.map(item => {
      // workState 적용 - all 이거나 필터값과 같을때,
      filterVal == 'all' || filterVal == item.workState
        ? // write 적용 - true : 수정 , false : 읽기
          item.write
          ? new ItemUpdate(
              this.$target.querySelector(`[data-Item${item.seq}]`),
              {
                item: item,
                updateItem: updateItem,
                currentTime: currentTime,
              },
            )
          : new Item(this.$target.querySelector(`[data-Item${item.seq}]`), {
              item: item,
              updateItem: updateItem,
              setWorkCount: setWorkCount,
              inputFocus: inputFocus,
            })
        : '';
    });
  }
}
