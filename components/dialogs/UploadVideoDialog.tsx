import React from 'react';
import { Dialog, DialogTitle, List, TextField, Button, Grid } from '@mui/material';
import { Movie } from '@mui/icons-material';

import 'react-phone-number-input/style.css';
import { useFormik } from 'formik';
import styled from 'styled-components';

// Local Import
import { IDialogProps } from '../../interfaces/dialog.interface';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
// Firebase
import { fAuth, fStorage, fStore } from '../../firebase/init.firebase';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { VideoValidationSchema } from '../../validation/video.validation';
import VideoPreview from '../common/VideoPreview';
import { useSnackbar } from 'notistack';
import { NO_SELECT_VIDEO_FILE, UPLOAD_VIDEO_FAILED, UPLOAD_VIDEO_SUCCESS } from '../../constants/upload';
import LoaderRed from '../loaders/LoaderRed';
import { minHeight } from '@mui/system';

const SCDialogTitle = styled(DialogTitle)`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-family: 'Gambetta', serif;
  transition: 700ms ease;
  font-variation-settings: 'wght' 311;
  margin-bottom: 0.8rem;
  color: black;
  outline: none;
  text-align: center;
  margin-bottom: 0;
`;
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
  margin-bottom: 1rem;
`;

const SCError = styled.p`
  color: red;
  text-align: center;
  width: 100%;
  margin: 0.1rem 0;
  line-height: 1rem;
`;

const SCButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;
`;
const SCUpload = styled(SCButton)``;

const UploadVideoDialog = (props: IDialogProps) => {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [profile, setProfile] = React.useState<any>();

  const inputRef = React.useRef<any>();

  const [file, setFile] = React.useState<any>();
  const [progress, setProgress] = React.useState<any>();

  const handleCloseUploadVideoDialog = () => {
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
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

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

  const onSubmit = async () => {
    if (!file) {
      enqueueSnackbar(NO_SELECT_VIDEO_FILE, { variant: 'warning' });
    }
    try {
      // 'file' comes from the Blob or File API
      if (file && fAuth.currentUser) {
        const videoRef = ref(fStorage, `videos/${fAuth.currentUser.uid}${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(videoRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress && setProgress(progress.toFixed());

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
                setProgress(null);

                handleCloseUploadVideoDialog();
              } else {
                enqueueSnackbar(UPLOAD_VIDEO_FAILED, { variant: 'error' });
                setProgress(null);

                handleCloseUploadVideoDialog();
              }
            });
          },
        );
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(UPLOAD_VIDEO_FAILED, { variant: 'error' });
      setProgress(null);
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
      <Dialog onClose={handleCloseUploadVideoDialog} open={open}>
        {progress ? (
          <LoaderRed progress={progress} />
        ) : (
          <>
            <SCDialogTitle textAlign={'center'}>Upload Video</SCDialogTitle>
            <Grid container display="flex" alignItems="flex-end" sx={{ maxHeight: '100%' }}>
              <Grid item xs>
                {file && <VideoPreview hashtag={'Preview Video'} url={file.preview} />}
              </Grid>
              <Grid item xs>
                <List sx={{ pt: 0 }}>
                  <SCForm onSubmit={(event) => handleSubmit(event)}>
                    {/* desc */}
                    <SCTextField
                      id="desc"
                      variant="outlined"
                      size="small"
                      label="Description *"
                      value={values.desc}
                      onChange={handleChange}
                    />
                    {submited && !!errors.desc && errors.desc && <SCError>{errors.desc}</SCError>}

                    {/* hashtag */}
                    <SCTextField
                      id="hashtag"
                      variant="outlined"
                      size="small"
                      label="Hashtag *"
                      value={values.hashtag}
                      onChange={handleChange}
                    />
                    {submited && !!errors.desc && errors.hashtag && <SCError>{errors.hashtag}</SCError>}

                    {/*  */}
                    <SCUpload
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => inputRef.current.click()}
                    >
                      <Movie />
                      <p>Upload Video</p>
                      <input
                        type="file"
                        ref={inputRef}
                        hidden
                        accept=".mp4"
                        onChange={(event) => onFileChange(event)}
                      />
                    </SCUpload>

                    <SCButton type="submit" variant="contained">
                      Upload video
                    </SCButton>
                  </SCForm>
                </List>
              </Grid>
            </Grid>
            <div id="recaptcha-container"></div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default UploadVideoDialog;
