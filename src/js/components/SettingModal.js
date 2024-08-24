import Component from '../core/Component.js';

export default class SettingModal extends Component {
  template() {
    const { settingTabnum } = this.props;
    return `
          <div class='settingModal'>
            <div class='tabhead'>
              <div class='tabList'>
                <div class="tabBtn ${settingTabnum == 'color' ? 'active' : ''}">color</div>
                <div class="tabBtn ${settingTabnum == 'tab2' ? 'active' : ''}">tab2</div>
                <div class="tabBtn ${settingTabnum == 'tab3' ? 'active' : ''}">tab3</div>
              </div>
              <div class='closeBtn'> X </div>
            </div>

            <div class='tabbody'>
            ${
              settingTabnum == 'color'
                ? ` <div class="setColor skyblue" data-colors='{"main": "lightskyblue", "bg": "#f8fcff", "font": "#25a6f6", "btn": "#a9dcfb", "btn_active": "#6fc4f9"}'>
                      <div class='box'></div> 
                      <div class='text'>하늘색</div>
                    </div>
                    <div class="setColor pink" data-colors='{"main": "pink", "bg": "#fffdfe", "font": "#ff889d", "btn": "#ffdae0", "btn_active": "#ffacba"}'> 
                      <div class='box'></div>
                      <div class='text'>분홍색</div>
                    </div>
                    <div class="setColor green" data-colors='{"main": "#95d5b2", "bg": "#f8fcfa", "font": "#5ebf8a", "btn": "#afdfc5", "btn_active": "#7fcca2"}'> 
                      <div class='box'></div>
                      <div class='text'>연두색</div>
                    </div>
                `
                : settingTabnum == 'tab2'
                  ? '<div>tab2 입니다. </div>'
                  : '<div>tab3 입니다. </div>'
            }
            </div>
          </div>
    `;
  }
  setEvent() {
    const { setSetting, setSettingTabnum } = this.props;
    this.addEvent('click', '.closeBtn', () => {
      setSetting(false);
    });
    this.addEvent('click', '.tabBtn', e => {
      setSettingTabnum(e.target.innerText);
    });
    this.addEvent('click', '.setColor', e => {
      const colors = JSON.parse(
        e.target.parentElement.getAttribute('data-colors'),
      );
      Object.keys(colors).forEach(key => {
        document.documentElement.style.setProperty(
          `--color-${key}`,
          colors[key],
        );
      });
    });
  }
}
