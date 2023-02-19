import React from 'react';
import { Dialog, DialogTitle, List, TextField, Button, Avatar } from '@mui/material';
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

import { doc, setDoc } from 'firebase/firestore';
import { useSnackbar, VariantType } from 'notistack';
import { NO_SELECT_AVATAR_FILE, UPLOAD_PROFILE_ERROR, UPLOAD_PROFILE_SUCCESS } from '../../constants/upload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}

const SettingsUserDialog = (props: IDialogProps) => {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();

  // file
  const inputRef = React.useRef<any>();
  const [file, setFile] = React.useState<any>();
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
        const imageRef = ref(fStorage, `images/${fAuth.currentUser?.uid}${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
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
            // Handle unsuccessful uploads
            enqueueSnackbar(error.message, { variant: 'error' });
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              if (downloadURL && fAuth.currentUser) {
                await setDoc(doc(fStore, 'users', fAuth.currentUser.uid), {
                  uid: fAuth.currentUser.uid,
                  name: values.name,
                  nickname: values.nickname,
                  photoURL: downloadURL,
                  tick: false,
                });
                // upload sucess
                enqueueSnackbar(UPLOAD_PROFILE_SUCCESS, { variant: 'success' });
                handleCloseLoginDialog();
              } else {
                // upload failed
                enqueueSnackbar(UPLOAD_PROFILE_ERROR, { variant: 'error' });
              }
            });
          },
        );
      }
    } catch (error: any) {
      enqueueSnackbar(UPLOAD_PROFILE_ERROR, { variant: 'error' });
    }
  };

  const { values, errors, handleChange, handleSubmit, submitCount } = useFormik({
    validationSchema: ProfileValidationSchema,
    initialValues: initialValues,
    onSubmit: onSubmit,
    validateOnBlur: true,
  });
  const submited = submitCount > 0;

  // Get production API keys from Upload.io

  return (
    <>
      <Dialog onClose={handleCloseLoginDialog} open={open}>
        <DialogTitle textAlign={'center'}>Settings Profile</DialogTitle>
        <List sx={{ pt: 0 }}>
          <SCForm onSubmit={(event) => handleSubmit(event)}>
            <SCTextField
              id="name"
              variant="outlined"
              size="small"
              label="Name"
              value={values.name}
              onChange={handleChange}
            />
            {submited && !!errors.name && errors.name && <SCError>{errors.name}</SCError>}

            <SCTextField
              id="nickname"
              variant="outlined"
              size="small"
              label="Nickname"
              value={values.nickname}
              onChange={handleChange}
            />
            {submited && !!errors.nickname && errors.nickname && <SCError>{errors.nickname}</SCError>}

            <SCButton variant="outlined" color="secondary" size="small" onClick={() => inputRef.current.click()}>
              Upload Avatar
              <input type="file" ref={inputRef} hidden accept="image/*" onChange={(event) => onFileChange(event)} />
            </SCButton>

            {file && <SCAvatarPreview src={file.preview} />}
            <SCButton type="submit" variant="contained">
              Update Profile
            </SCButton>
          </SCForm>
        </List>
        <div id="recaptcha-container"></div>
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
  margin-top: 1rem;
`;
const SCAvatarPreview = styled(Avatar)``;
const SCError = styled.p`
  color: red;
  text-align: center;
  width: 100%;
  margin: 0.1rem 0;
  line-height: 1rem;
`;

export default SettingsUserDialog;
