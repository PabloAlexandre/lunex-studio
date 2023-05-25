import getLodash from 'lodash/get';
import setLodash from 'lodash/set';
import groupByLodash from 'lodash/groupBy';

export function get<T>(object: T, path: string, initialValue?: T) {
  return getLodash(object as object, path, initialValue);
}

export function set<T>(object: T, path: string, value: T) {
  return setLodash(object as object, path, value);
}

export function groupBy<T extends object>(array: Array<T>, iteratee: string | ((item: T) => string)) {
  return groupByLodash(array, iteratee);
}