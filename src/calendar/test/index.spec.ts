import { Calendar } from '..';
import { mount, later, trigger } from '../../../test';
import { defalutDateText, defaultDate, defaultYearMonth } from './utils';

test('range-type with allow-same-day', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultDatetime: null,
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);
  expect(onChange).toBeCalledTimes(2);

  const days = wrapper.findAll('.calendar_day');
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(2);
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(2);

  wrapper.setProps({ allowSameDay: true });
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(2);
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 1),
    new Date(2022, 0, 1),
  ]);
});
