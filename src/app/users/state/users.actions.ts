import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user.model';

export const UsersAPIActions = createActionGroup({
  source: 'Users API',
  events: {
    'Users Loaded Successfully': props<{ users: User[] }>(),
    'Users Loaded Failed': props<{ message: string }>(),
  },
});

export const UsersGlobalActions = createActionGroup({
  source: 'Users Global',
  events: {
    'Load Users': emptyProps(),
  },
});
