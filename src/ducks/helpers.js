import { OrderedMap, Map } from "immutable";

export function generateID() {
  return Date.now();
}

export function fbDataToEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([uid, value]) => [
    uid,
    new RecordModel(value).set("uid", uid)
  ]);
}
