import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function persisted(key, init) {
  const store = writable(init);
  if (browser) {
    const saved = localStorage.getItem(key);
    if (saved) store.set(JSON.parse(saved));
    store.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
  }
  return store;
}

export const quest = persisted('quest', null);
export const bouts = persisted('bouts', []);
export const totalXP = persisted('totalXP', 0);
