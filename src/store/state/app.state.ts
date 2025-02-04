import { State as UserState } from '../reducer/user.reducer';

export interface AppState {
  user: UserState;
}