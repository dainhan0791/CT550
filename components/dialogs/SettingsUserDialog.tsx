import React from 'react';
import { Dialog, DialogTitle, List, TextField, Button } from '@mui/material';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import OtpInput from 'react-otp-input';
import { useFormik } from 'formik';
import styled from 'styled-components';

// Local Import
import { IDialogProps } from '../../interfaces/dialog.interface';
import { LoginValidationSchema } from '../../validation/login.validation';
import SuccessSnackbar from '../snackbars/MainSnackbar';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setUser } from '../../redux/slices/auth.slice';
// Firebase
import { fAuth, fStore } from '../../firebase/init.firebase';
import { ProfileValidationSchema } from '../../validation/profile.validation';

import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { SNACKBAR_ERROR, SNACKBAR_SUCESS } from '../../constants/snackbar.constant';
import { UPLOAD_PROFILE_ERROR, UPLOAD_PROFILE_SUCESS } from '../../constants/upload.profile';
import { doc, setDoc } from 'firebase/firestore';
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

  const [file, setFile] = React.useState<any>();

  // handle open snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = React.useState<string>('');
  const [severitySnackbar, setSeveritySnackbar] = React.useState<string>('');

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const openSnackbarUploadSuccess = () => {
    setMessageSnackbar(UPLOAD_PROFILE_SUCESS);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_SUCESS);
  };

  const openSnackbarUploadError = () => {
    setMessageSnackbar(UPLOAD_PROFILE_ERROR);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_ERROR);
  };

  const handleCloseLoginDialog = () => {
    onClose && onClose();
  };

  const initialValues = {
    name: '',
    nickname: '',
  };

  const onSubmit = async () => {
    try {
      if (fAuth.currentUser && fStore) {
        await setDoc(doc(fStore, 'users', fAuth.currentUser.uid), {
          uid: fAuth.currentUser.uid,
          name: values.name,
          nickname: values.nickname,
          photoURL: file.fileUrl || '',
          tick: false,
        });

        openSnackbarUploadSuccess();

        setTimeout(handleCloseLoginDialog, 2000);
      }
    } catch (error) {
      console.log(error);
      openSnackbarUploadError();
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
  const uploader = Uploader({
    apiKey: 'free',
  });

  // Customize the file upload UI (see "customization"):
  const options = { multi: false };

  return (
    <>
      <Dialog onClose={handleCloseLoginDialog} open={open}>
        <SuccessSnackbar
          open={openSnackbar}
          close={handleCloseSnackbar}
          message={messageSnackbar}
          severity={severitySnackbar}
        />
        <DialogTitle textAlign={'center'}>Settings Profile</DialogTitle>
        <List sx={{ pt: 0 }}>
          <SCForm onSubmit={(event) => handleSubmit(event)}>
            <SCTextField
              id="name"
              variant="outlined"
              size="small"
              value={values.name}
              onChange={handleChange}
              placeholder="Please enter your name"
            />
            {submited && !!errors.name && errors.name && <SCError>{errors.name}</SCError>}

            <SCTextField
              id="nickname"
              variant="outlined"
              size="small"
              value={values.nickname}
              onChange={handleChange}
              placeholder="Please enter your nickname"
            />
            {submited && !!errors.nickname && errors.nickname && <SCError>{errors.nickname}</SCError>}

            <UploadButton
              uploader={uploader} // Required.
              options={options} // Optional.
              onComplete={(files) => {
                // Optional.
                if (files.length === 0) {
                  console.log('No files selected.');
                } else {
                  setFile(files[0]);
                  console.log('Files uploaded:');
                  // console.log(files.map((f) => f.fileUrl));
                }
              }}
            >
              {({ onClick }) => (
                <SCButton variant="outlined" color="secondary" onClick={onClick} sx={{ marginBottom: '0.4rem' }}>
                  Upload Avatar Image
                </SCButton>
              )}
            </UploadButton>

            {submited && !file && <SCError>Please select a file</SCError>}
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
const SCPhoneInput = styled(PhoneInput)`
  width: 240px;
  > div {
    line-height: 30px !important;
  }
  > input {
    line-height: 30px !important;
  }
  margin-bottom: 1rem;
`;

const SCTextField = styled(TextField)`
  width: 240px;
  margin: 1rem 0;
`;
const SCButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;
const SCError = styled.p`
  color: red;
  text-align: center;
  width: 100%;
  margin: 0.1rem 0;
  line-height: 1rem;
`;

export default SettingsUserDialog;
