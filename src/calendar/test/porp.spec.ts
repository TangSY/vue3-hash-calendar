import { Calendar } from '..';
import { mount, later } from '../../../test';

test('should change color when set theme-color', async () => {
  const wrapper = mount(Calendar, {
    props: {
      themeColor: {
        'main-color': 'red',
        'bg-color': 'grey',
        'main-font-color': 'blue',
        'vice-font-color': 'green',
        'disabled-bg-color': 'black',
        'disabled-font-color': 'yellow',
      },
    },
  });

  await later(200);

  const calendar = wrapper.find('.hash-calendar');
  expect(calendar.attributes('style')).toContain(
    '--hash-calendar-main-color: red; --hash-calendar-bg-color: grey; --hash-calendar-main-font-color: blue; --hash-calendar-vice-font-color: green; --hash-calendar-disabled-bg-color: black; --hash-calendar-disabled-font-color: yellow;'
  );
});

test('change-year-fast prop', async () => {
  const wrapper = mount(Calendar);

  await later();

  const date = wrapper.find('.calendar_title_date_year');
  date.trigger('click');
  await later();

  expect(wrapper.find('.year-body').exists()).toBeFalsy();

  await wrapper.setProps({ changeYearFast: true });
  date.trigger('click');
  await later();

  expect(wrapper.find('.year-body').attributes('style')).toContain(
    'display: block'
  );
});
