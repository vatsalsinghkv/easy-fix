import { Reducer } from 'react';

interface IdleState {
  data: null;
  error: null;
  isIdle: true;
  isPending: false;
  isRejected: false;
  isResolved: false;
  status: 'idle';
}

interface PendingState {
  data: null;
  error: null;
  isIdle: false;
  isPending: true;
  isRejected: false;
  isResolved: false;
  status: 'pending';
}

interface ResolvedState<TData extends any> {
  data: TData;
  error: null;
  isIdle: false;
  isPending: false;
  isRejected: false;
  isResolved: true;
  status: 'resolved';
}

interface RejectedState {
  data: null;
  error: Error;
  isIdle: false;
  isPending: false;
  isRejected: true;
  isResolved: false;
  status: 'rejected';
}

export type State<TData extends any> =
  | IdleState
  | PendingState
  | RejectedState
  | ResolvedState<TData>;

type LoadAction = {
  type: 'load';
};

type ResolvedAction<TData extends any> = {
  type: 'resolved';
  payload: TData;
};

type RejectedAction = {
  type: 'rejected';
  payload: Error;
};

type Action<TData> = LoadAction | RejectedAction | ResolvedAction<TData>;

export function getDefaultState(): IdleState {
  return {
    data: null,
    error: null,
    isIdle: true,
    isPending: false,
    isRejected: false,
    isResolved: false,
    status: 'idle',
  };
}

function getReducer<TData extends any>(): Reducer<State<TData>, Action<TData>> {
  return function (state, action) {
    switch (action.type) {
      case 'load':
        return {
          data: null,
          error: null,
          isIdle: false,
          isPending: true,
          isRejected: false,
          isResolved: false,
          status: 'pending',
        };
      case 'rejected':
        return {
          data: null,
          error: action.payload,
          isIdle: false,
          isPending: false,
          isRejected: true,
          isResolved: false,
          status: 'rejected',
        };
      case 'resolved':
        return {
          data: action.payload,
          error: null,
          isIdle: false,
          isPending: false,
          isRejected: false,
          isResolved: true,
          status: 'resolved',
        };
      default:
        return state;
    }
  };
}

export default getReducer;
