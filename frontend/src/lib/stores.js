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

export const quests = persisted('quests', []);
export const currentQuest = persisted('currentQuest', null);