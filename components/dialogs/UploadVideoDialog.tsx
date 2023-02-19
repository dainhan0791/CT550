import React from 'react';
import { Dialog, DialogTitle, List, TextField, Button } from '@mui/material';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useFormik } from 'formik';
import styled from 'styled-components';

// Local Import
import { IDialogProps } from '../../interfaces/dialog.interface';
import { LoginValidationSchema } from '../../validation/login.validation';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setUser } from '../../redux/slices/auth.slice';
// Firebase
import { fAuth, fStorage, fStore } from '../../firebase/init.firebase';
import { ProfileValidationSchema } from '../../validation/profile.validation';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { VideoValidationSchema } from '../../validation/video.validation';
import Video from '../common/Video';
import VideoPreview from '../common/VideoPreview';
import { useSnackbar } from 'notistack';
import { NO_SELECT_VIDEO_FILE, UPLOAD_VIDEO_FAILED, UPLOAD_VIDEO_SUCCESS } from '../../constants/upload';
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}

const UploadVideoDialog = (props: IDialogProps) => {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [profile, setProfile] = React.useState<any>();

  const inputRef = React.useRef<any>();

  const [file, setFile] = React.useState<any>();
  const [process, setProcess] = React.useState<number>(0);

  const handleCloseLoginDialog = () => {
    onClose && onClose();
  };

  const initialValues = {
    desc: '',
    hashtag: '',
  };

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setFile(file);
    }
  };

  React.useEffect(() => {
    const getProfileFromFirebase = async () => {
      if (fStore && fAuth.currentUser?.uid) {
        const userRef = doc(fStore, 'users', fAuth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      }
    };
    getProfileFromFirebase();
  }, []);

  React.useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onSubmit = async () => {
    if (!file) {
      enqueueSnackbar(NO_SELECT_VIDEO_FILE, { variant: 'warning' });
    }
    try {
      // 'file' comes from the Blob or File API
      if (file && fAuth.currentUser) {
        const videoRef = ref(fStorage, `videos/${fAuth.currentUser?.uid}${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(videoRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress && setProcess(progress);

            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.log(error);
            // Handle unsuccessful uploads
            enqueueSnackbar(UPLOAD_VIDEO_FAILED, { variant: 'error' });
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              if (downloadURL && fAuth.currentUser && profile) {
                await setDoc(doc(fStore, 'videos', fAuth.currentUser.uid + Date.now()), {
                  uid: fAuth.currentUser.uid,
                  name: profile.name,
                  nickname: profile.nickname,
                  photoURL: profile.photoURL,
                  desc: values.desc,
                  hashtag: values.hashtag,
                  url: downloadURL,
                });
                enqueueSnackbar(UPLOAD_VIDEO_SUCCESS, { variant: 'success' });
                handleCloseLoginDialog();
              } else {
                enqueueSnackbar(UPLOAD_VIDEO_FAILED, { variant: 'error' });
              }
            });
          },
        );
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(UPLOAD_VIDEO_FAILED, { variant: 'error' });
    }
  };

  const { values, errors, handleChange, handleSubmit, submitCount } = useFormik({
    validationSchema: VideoValidationSchema,
    initialValues: initialValues,
    onSubmit: onSubmit,
    validateOnBlur: true,
  });
  const submited = submitCount > 0;

  return (
    <>
      <Dialog onClose={handleCloseLoginDialog} open={open}>
        {process ? (
          <>
            Uploading
            <CircularProgress variant="determinate" value={process} />
            {process}%
          </>
        ) : (
          <>
            <DialogTitle textAlign={'center'}>Upload Video</DialogTitle>
            <List sx={{ pt: 0 }}>
              <SCForm onSubmit={(event) => handleSubmit(event)}>
                {/* desc */}
                <SCTextField
                  id="desc"
                  variant="outlined"
                  size="small"
                  label="desc"
                  value={values.desc}
                  onChange={handleChange}
                  placeholder="desc"
                />
                {submited && !!errors.desc && errors.desc && <SCError>{errors.desc}</SCError>}

                {/* hashtag */}
                <SCTextField
                  id="hashtag"
                  variant="outlined"
                  size="small"
                  label="hashtag"
                  value={values.hashtag}
                  onChange={handleChange}
                  placeholder="hashtag"
                />
                {submited && !!errors.desc && errors.hashtag && <SCError>{errors.hashtag}</SCError>}

                {/*  */}
                <SCButton variant="outlined" color="secondary" size="small" onClick={() => inputRef.current.click()}>
                  Up load video
                  <input type="file" ref={inputRef} hidden accept=".mp4" onChange={(event) => onFileChange(event)} />
                </SCButton>
                {file && <VideoPreview hashtag={'Preview Video'} url={file.preview} />}
                <SCButton type="submit" variant="contained">
                  Upload video
                </SCButton>
              </SCForm>
            </List>
            <div id="recaptcha-container"></div>
          </>
        )}
      </Dialog>
    </>
  );
};

const SCForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
`;

const SCTextField = styled(TextField)`
  width: 240px;
  margin: 1rem 0;
`;
const SCButton = styled(Button)`
  width: 100%;
  margin: 1rem 0;
`;
const SCError = styled.p`
  color: red;
  text-align: center;
  width: 100%;
  margin: 0.1rem 0;
  line-height: 1rem;
`;

export default UploadVideoDialog;
