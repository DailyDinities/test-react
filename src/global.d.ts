declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

type RefObject<T> = {
  readonly current: T | null
}

declare module 'socket.io-client';
declare module 'express';