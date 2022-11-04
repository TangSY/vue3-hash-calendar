import { Calendar } from '..';
import { mount, later } from '../../../test';
import { minDate, maxDate } from './utils';

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

test('change-year-fast prop', () => {
  const wrapper = mount(Calendar);

  const date = wrapper.find({ name: 'CalendarYearMonth' });
});
