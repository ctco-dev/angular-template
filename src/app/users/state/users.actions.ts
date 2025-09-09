import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Fail': props<{ message: string }>(),
  },
});
