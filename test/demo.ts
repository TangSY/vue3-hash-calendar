import { h, defineComponent } from 'vue';
import { mount, later } from '.';

const EmptyComponent = defineComponent({
  inheritAttrs: false,
  render() {
    return h('div', [this.$slots.default?.()]);
  },
});

export function snapshotDemo(Demo: any, option: any = {}) {
  test('should render demo and match snapshot', async () => {
    if (option.beforeTest) {
      option.beforeTest();
    }

    const wrapper = mount(Demo, {
      global: {
        components: {
          'demo-block': EmptyComponent,
        },
      },
    });

    await later();

    expect(wrapper.html()).toMatchSnapshot();

    if (option.afterTest) {
      option.afterTest();
    }
  });
}
