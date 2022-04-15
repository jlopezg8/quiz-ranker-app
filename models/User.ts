import * as yup from './utils/localeYup';

export default interface User {
  username: string;
}

export interface UserToCreate extends User {
  password: string;
}

export const userInitialValues: User = {
  username: '',
};

export const userToCreateInitialValues: UserToCreate = Object.assign({
  password: '',
}, userInitialValues);

export const userSchema: yup.SchemaOf<User> = yup.object({
  username: yup.string().required(),
});

export const userToCreateSchema: yup.SchemaOf<UserToCreate> =
  userSchema.shape({
    password: yup.string().min(8).required(),
  });
