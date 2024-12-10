import "reflect-metadata";

export abstract class Entity {
  public id: string | number = 0;
  @IgnorePersistance()
  public isDelete = false;
  @IgnorePersistance()
  public isNew = true;

  public _events: { [prop: string]: string | number | null };
  constructor() {
    this._events = {};
  }
  getPersistanceValue() {
    return this.id;
  }
}

export abstract class ValueObject {
  constructor(protected _data: string | null) {}

  getPersistanceValue() {
    return this._data;
  }

  hasValue() {
    return this._data !== null;
  }

  isEmpty() {
    return !this._data;
  }
}

export class CollectionArray<T extends Entity> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
  }

  markAsDeletedById(id: string | number) {
    const index = this.findIndex(
      (el) => (el as unknown as { id: number | string }).id === id,
    );
    this[index].isDelete = true;
    this[index].isNew = false;
  }
}

export class ChangeTrackingProxy<T> {
  constructor(obj: T) {
    return new Proxy(obj as Entity, {
      set: function(target: Entity, prop: string, value: any) {
        const shouldIgnore = Reflect.getMetadata("ignore", target, prop);

        if (!shouldIgnore) {
          let propertyValue = null;
          if (value !== null) {
            propertyValue = value.getPersistanceValue
              ? value.getPersistanceValue()
              : value;
          }
          Reflect.set(target, "_events", {
            ...target._events,
            [Reflect.getMetadata("property-name", target, prop) || prop]:
              propertyValue,
          });
        }

        Reflect.set(target, prop, value);
        return true;
      },
    });
  }
}

export function PersistancePropertyName(metadata: any) {
  return function(target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata("property-name", metadata, target, propertyKey);
  };
}

export function IgnorePersistance() {
  return function(target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata("ignore", true, target, propertyKey);
  };
}

export abstract class DomainEvent<T> {
  constructor(
    public eventType: string,
    public payload: T,
  ) {}
}
