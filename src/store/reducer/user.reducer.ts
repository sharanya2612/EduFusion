import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import * as UserActions from '../action/user.action';

export interface State {
  user: User | null;
  error: any;
}

export const initialState: State = {
  user: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({ ...state, user })),
  on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, error }))
);