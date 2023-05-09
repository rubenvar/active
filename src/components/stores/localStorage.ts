import { createEffect } from 'solid-js';
import { Store, SetStoreFunction, createStore } from 'solid-js/store';

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  // get from localStorage
  const localState = localStorage.getItem(name);
  // set localStorage to SolidJS store
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  // save to localStorage
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));

  // return as normal SolidJS store
  return [state, setState];
}
