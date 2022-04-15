import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: '*Requerido',
  },
  string: {
    min: 'Debe tener al menos ${min} caracteres',
  },
});

export * from 'yup';
