import * as Yup from 'yup';

export const VideoValidationSchema = Yup.object().shape({
  desc: Yup.string().required(),
  hashtag: Yup.string().required(),
});
