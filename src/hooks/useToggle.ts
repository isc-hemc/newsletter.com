import { isBoolean } from 'lodash/fp';
import { useReducer } from 'react';

/**
 * Reducer function that will mutate the `useToggle` state.
 * @param {boolean} state - current state.
 * @param {boolean} next - If `boolean`, then the state will return this value, otherwise
 * it will return the current state negated.
 * @returns {boolean} - current state.
 */
const reducer = (state: boolean, next?: boolean): boolean =>
  isBoolean(next) ? next : !state;

/**
 * This hook creates a state that mutates even if you don't pass any parameter
 * to the dispatch function, the idea is to reduce boilerplate when creating
 * states that changes from `true` to `false` for task such like opening a modal.
 * @param initial - initial state, can be `true` or `false`.
 * @returns {[boolean, (next?: boolean) => void]}
 */
export const useToggle = (
  initial = false,
): [boolean, (next?: boolean) => void] =>
  useReducer<(s: boolean, n?: boolean) => void>(reducer, initial as never);
