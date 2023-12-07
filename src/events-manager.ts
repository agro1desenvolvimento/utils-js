class EventsManager<EventList extends EventListBase = EventListBase> {
  events: Events<EventList> = {};

  eventsOnEmit = new Set<EventOnEmit<EventList>>();

  add = <Type extends keyof EventList>(
    type: Type,
    callback: EventCallbackBase<EventList, Type>,
  ) => {
    if (!this.events[type]) this.events[type] = new Set();

    this.events[type]?.add(callback);

    return () => this.remove(type, callback);
  };

  remove = <Type extends keyof EventList>(
    type: Type,
    callback: EventCallbackBase<EventList, Type>,
  ) => {
    const events = this.events[type];

    if (events) events.delete(callback);
  };

  emit = <Type extends keyof EventList>(
    options: EventEmitterOptions<EventList, Type>,
  ) => {
    const events = this.events[options.type];

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (events) this.callEvents(events!, options.event);

    this.callEvents(this.eventsOnEmit, {
      data: options.event,
      type: options.type,
    });
  };

  addOnEmit = (callback: EventOnEmit<EventList>) => {
    this.eventsOnEmit.add(callback);

    return () => this.removeOnEmit(callback);
  };

  removeOnEmit = (callback: EventOnEmit<EventList>) => {
    this.eventsOnEmit.delete(callback);
  };

  private callEvents = <T>(events: Set<(data: T) => void>, data: T) => {
    events.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
  };
}

export type EventOnEmitData<EventList extends EventListBase> = {
  [key in keyof EventList]: { data: EventList[key]; type: key };
}[keyof EventList];

export type EventOnEmit<EventList extends EventListBase> = (
  event: EventOnEmitData<EventList>,
) => void;

export default EventsManager;

export type EventListBase = Record<string, any>;

type EventEmitterOptions<
  EventList extends EventListBase,
  Type extends keyof EventList,
> = {
  event: EventList[Type];
  type: Type;
};

export type EventCallbackBase<
  EventList extends EventListBase = EventListBase,
  Event extends keyof EventList = keyof EventList,
> = (event: EventList[Event]) => void;

type Events<EventList extends EventListBase> = {
  [k in keyof EventList]?: Set<EventCallbackBase<EventList, k>>;
};
