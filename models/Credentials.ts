import * as yup from './utils/localeYup';

export default interface Credentials {
  username: string;
  password: string;
}

export const credentialsInitialValues: Credentials = {
  username: '',
  password: '',
};

export const credentialsSchema: yup.SchemaOf<Credentials> = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});
