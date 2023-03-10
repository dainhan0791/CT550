import React from 'react';
import 'react-phone-number-input/style.css';
import { Dialog, DialogTitle, List, TextField, Button, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import { useFormik } from 'formik';
import styled from 'styled-components';

// Local Import
import { IDialogProps } from '../../interfaces/dialog.interface';
import { useSnackbar } from 'notistack';
import { NO_SELECT_AVATAR_FILE, UPLOAD_PROFILE_ERROR, UPLOAD_PROFILE_SUCCESS } from '../../constants/upload';
import { setProfile } from '../../redux/slices/account.slice';
import { removeAccents } from '../../utils/display';
import AlertError from '../common/AlertError';
import RedLoader from '../loaders/RedLoader';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
// Firebase
import { fAuth, fStorage, fStore } from '../../firebase/init.firebase';
import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { ProfileValidationSchema } from '../../validation/profile.validation';

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
const SCButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;
`;

const SCUpload = styled(SCButton)``;
const SCAvatarPreview = styled(Avatar)`
  margin-top: 1rem !important;
`;

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

const SettingsUserDialog = (props: IDialogProps) => {
  const profile = useAppSelector((state) => state.account.profile);
  const { onClose, open } = props;
  const dispatch = useAppDispatch();

  // file
  const inputRef = React.useRef<any>();
  const [file, setFile] = React.useState<any>();
  const [progress, setProgress] = React.useState<any>();

  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseLoginDialog = () => {
    onClose && onClose();
  };

  const initialValues = {
    name: '',
    nickname: '',
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

  const onSubmit = async () => {
    if (!file) {
      enqueueSnackbar(NO_SELECT_AVATAR_FILE, { variant: 'warning' });
      return;
    }
    try {
      if (file && fStorage && fAuth.currentUser) {
        const imageRef = ref(fStorage, `images/${fAuth.currentUser.uid}${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
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
                'Upload is running';
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            enqueueSnackbar(error.message, { variant: 'error' });
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              if (downloadURL && profile) {
                await updateDoc(doc(fStore, 'users', profile.uid), {
                  uid: profile.uid,
                  name: values.name,
                  nickname: values.nickname,
                  noAccentName: removeAccents(`${values.name} ${values.nickname}`),
                  photoURL: downloadURL,
                  timestampUpdate: serverTimestamp(),
                });

                // upload sucess
                enqueueSnackbar(UPLOAD_PROFILE_SUCCESS, { variant: 'success' });
                setProgress(null);
                handleCloseLoginDialog();
              } else {
                // upload failed
                enqueueSnackbar(UPLOAD_PROFILE_ERROR, { variant: 'error' });
                setProgress(null);
              }
            });
          },
        );
      }
    } catch (error: any) {
      enqueueSnackbar(UPLOAD_PROFILE_ERROR, { variant: 'error' });
      setProgress(null);
    }
  };

  const { values, errors, handleChange, handleSubmit, submitCount } = useFormik({
    validationSchema: ProfileValidationSchema,
    initialValues: initialValues,
    onSubmit: onSubmit,
    validateOnBlur: true,
  });
  const submited = submitCount > 0;

  return (
    <>
      <Dialog onClose={handleCloseLoginDialog} open={open}>
        {!!progress ? (
          <RedLoader progress={progress} />
        ) : (
          <>
            <SCDialogTitle>Setting Profile</SCDialogTitle>
            <List sx={{ pt: 0 }}>
              <SCForm onSubmit={(event) => handleSubmit(event)}>
                {submited && !!errors.name && <AlertError severity="error">{errors.name}</AlertError>}
                {submited && !!errors.nickname && <AlertError severity="error">{errors.nickname}</AlertError>}

                <SCTextField
                  id="name"
                  variant="outlined"
                  size="small"
                  label="Name *"
                  value={values.name}
                  onChange={handleChange}
                />

                <SCTextField
                  id="nickname"
                  variant="outlined"
                  size="small"
                  label="Nickname *"
                  value={values.nickname}
                  onChange={handleChange}
                />

                <SCUpload variant="outlined" color="secondary" size="small" onClick={() => inputRef.current.click()}>
                  <ImageIcon />
                  <p>Upload Avatar</p>
                  <input type="file" ref={inputRef} hidden accept="image/*" onChange={(event) => onFileChange(event)} />
                </SCUpload>

                {file && <SCAvatarPreview src={file.preview} />}
                <SCButton type="submit" variant="contained">
                  Update
                </SCButton>
              </SCForm>
            </List>
          </>
        )}
        <div id="recaptcha-container"></div>
      </Dialog>
    </>
  );
};

export default SettingsUserDialog;
