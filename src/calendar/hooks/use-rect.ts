import { type Ref, unref } from 'vue';
import { isWindow } from '../utils';

const makeDOMRect = (width: number, height: number) => ({
  top: 0,
  left: 0,
  right: width,
  bottom: height,
  width,
  height,
});

export const useRect = (elementOrRef: HTMLElement | Ref) => {
  const element = unref(elementOrRef);
  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return makeDOMRect(width, height);
  }
  if (element == null ? undefined : element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
};
