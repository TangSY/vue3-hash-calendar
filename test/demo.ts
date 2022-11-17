import { mount, later } from '.';

export function snapshotDemo(Demo: any, option: any = {}) {
  test('should render demo and match snapshot', async () => {
    if (option.beforeTest) {
      option.beforeTest();
    }

    const wrapper = mount(Demo, {
      props: {
        defaultDatetime: new Date('1994/10/21 22:22:22'),
      },
    });

    await later(500);

    expect(wrapper.html()).toMatchSnapshot();

    if (option.afterTest) {
      option.afterTest();
    }
  });
}
