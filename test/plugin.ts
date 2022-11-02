import { ComponentPublicInstance } from 'vue';
import { config, VueWrapper, DOMWrapper } from '@vue/test-utils';

const stylePlugin = (
  wrapper: VueWrapper<ComponentPublicInstance> | DOMWrapper<Element>
) => ({
  style: (wrapper.element as HTMLElement).style,
});

config.plugins.DOMWrapper.install(stylePlugin as any);
config.plugins.VueWrapper.install(stylePlugin);
