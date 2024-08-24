import Component from '../core/Component.js';
import SettingModal from './SettingModal.js';

export default class Nav extends Component {
  template() {
    return `
        <div class='logo'> TodoList </div>
        <div class='setting'> 
            <div class='openBtn'>설정</div>
            <div class='setModal'></div>
        </div>
        

    `;
  }
  mounted() {
    const { settingBtn, setSetting, settingTabnum, setSettingTabnum } =
      this.props;
    settingBtn
      ? new SettingModal(this.$target.querySelector('.setModal'), {
          setSetting: setSetting,
          settingTabnum: settingTabnum,
          setSettingTabnum: setSettingTabnum,
        })
      : '';
  }
  setEvent() {
    const { setSetting } = this.props;
    this.addEvent('click', '.openBtn', () => {
      setSetting(true);
    });
  }
}
