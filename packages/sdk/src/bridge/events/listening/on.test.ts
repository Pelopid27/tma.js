import { createWindow, type WindowSpy } from '@test-utils/createWindow.js';
import { dispatchWindowMessageEvent } from '@test-utils/dispatchWindowMessageEvent.js';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { resetMiniAppsEventEmitter } from '@/bridge/events/event-emitter/singleton.js';

import { on } from './on.js';

let windowSpy: WindowSpy;

beforeEach(() => {
  windowSpy = createWindow();
});

afterEach(() => {
  windowSpy.mockRestore();

  // We have to dispose event emitter as long as it is saved between tests and works improperly.
  resetMiniAppsEventEmitter();
});

it('should call listener in case, Telegram event was created', () => {
  const listener = vi.fn();
  on('viewport_changed', listener);

  const eventData = {
    height: 123,
    width: 321,
    is_expanded: false,
    is_state_stable: false,
  };
  dispatchWindowMessageEvent('viewport_changed', eventData);

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener).toHaveBeenCalledWith(eventData);
});

it('should remove listener after being called if "once" option was passed', () => {
  const listener = vi.fn();
  on('viewport_changed', listener, true);

  const eventData = {
    height: 123,
    width: 321,
    is_expanded: false,
    is_state_stable: false,
  };
  dispatchWindowMessageEvent('viewport_changed', eventData);
  dispatchWindowMessageEvent('viewport_changed', eventData);

  expect(listener).toHaveBeenCalledTimes(1);
})

it('should remove listener in case, returned callback was called', () => {
  const listener = vi.fn();
  const emit = () => dispatchWindowMessageEvent('viewport_changed', {
    height: 123,
    width: 321,
    is_expanded: false,
    is_state_stable: false,
  });

  const off = on('viewport_changed', listener);
  emit();
  expect(listener).toHaveBeenCalledTimes(1);

  off();
  emit();
  expect(listener).toHaveBeenCalledTimes(1);
});
