import type { App, Component } from 'vue';

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export const withInstall = <T extends Component>(options: T) => {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options;
    if (name) {
      app.component(name, options);
    }
  };

  return options as WithInstall<T>;
};
