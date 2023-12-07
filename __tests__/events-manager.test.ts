import { EventsManager } from '../src';

describe('eventsManager', () => {
  let eventsManager = new EventsManager();

  beforeEach(() => {
    eventsManager = new EventsManager();
  });

  it('should add the listener', () => {
    const listener = jest.fn();

    eventsManager.add('change', listener);

    expect(eventsManager.events.change?.size).toBe(1);
    expect(eventsManager.events.change?.values().next().value).toBe(listener);
  });

  it('should call the listener', () => {
    const listener = jest.fn();

    const event = { fake: 'event' };
    eventsManager.add('change', listener);

    eventsManager.emit({ type: 'change', event });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it('should remove the listener', () => {
    const listener = jest.fn();
    eventsManager.add('change', listener);

    expect(eventsManager.events.change?.size).toBe(1);

    eventsManager.remove('change', listener);

    expect(eventsManager.events.change?.size).toBe(0);
  });

  it('should add the emit listener', () => {
    const listener = jest.fn();

    eventsManager.addOnEmit(listener);

    expect(eventsManager.eventsOnEmit.size).toBe(1);
    expect(eventsManager.eventsOnEmit.values().next().value).toBe(listener);
  });

  it('should call the emit listener', () => {
    const listener = jest.fn();

    const event = { fake: 'event' };
    eventsManager.addOnEmit(listener);

    eventsManager.emit({ type: 'change', event });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ data: event, type: 'change' });
  });

  it('should remove the emit listener', () => {
    const listener = jest.fn();
    eventsManager.addOnEmit(listener);

    expect(eventsManager.eventsOnEmit.size).toBe(1);

    eventsManager.removeOnEmit(listener);

    expect(eventsManager.eventsOnEmit.size).toBe(0);
  });
});
