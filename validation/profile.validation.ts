import * as Yup from 'yup';

export const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  nickname: Yup.string().required(),

  // password: Yup.string().required().min(6),
  // confirmPassword: Yup.string()
  //   .required()
  //   .min(6)
  //   .oneOf([Yup.ref('password')], 'Confirm Password Invalid'),
});
