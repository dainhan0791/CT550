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
import MainSnackbar from '../snackbars/MainSnackbar';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setUser } from '../../redux/slices/auth.slice';
// Firebase
import { fAuth } from '../../firebase/init.firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { LOGIN_TITLE, VERTIFY_TITLE } from '../../constants/login.constant';
import {
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
  SNACKBAR_ERROR,
  SNACKBAR_SUCESS,
  VERTIFY_SMS_ERROR,
  VERTIFY_SMS_SUCCESS,
} from '../../constants/snackbar.constant';
import { saveIdTokenToLocalStorage } from '../../utils/auth.localstorage';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}

const LogInDialog = (props: IDialogProps) => {
  const { onClose, open } = props;

  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string>('');

  const [isOpenVertify, setIsOpenVertify] = React.useState<boolean>(false);
  const [isOtpError, setOtpError] = React.useState<boolean>(false);

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

  const openSnackbarSendSMSSuccess = () => {
    setMessageSnackbar(SEND_SMS_SUCCESS);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_SUCESS);
  };
  const openSnackbarSendSMSError = () => {
    setMessageSnackbar(SEND_SMS_ERROR);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_ERROR);
  };
  const openSnackbarVertifyOTPSuccess = () => {
    setMessageSnackbar(VERTIFY_SMS_SUCCESS);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_SUCESS);
  };
  const openSnackbarVertifyOTPError = () => {
    setMessageSnackbar(VERTIFY_SMS_ERROR);
    handleOpenSnackbar();
    setSeveritySnackbar(SNACKBAR_ERROR);
  };

  const handleCloseLoginDialog = () => {
    onClose && onClose();
  };

  const backToSendSMS = () => {
    setIsOpenVertify(false);
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        },
      },
      fAuth,
    );
  };
  const reGenerateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        },
        fAuth,
      );
    }
  };

  const onSubmit = async () => {
    if (phoneNumber.length < 11) {
      return;
    } else {
      try {
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        if (fAuth && phoneNumber && appVerifier) {
          signInWithPhoneNumber(fAuth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              openSnackbarSendSMSSuccess();
              // Open vertify otp
              setIsOpenVertify(true);
            })
            .catch((error) => {
              // Error; SMS not sent
              console.log(error);
              openSnackbarSendSMSError();
            });
        } else {
          reGenerateRecaptcha();
        }
      } catch (error) {
        console.log(error);
        reGenerateRecaptcha();

        // Open Snackbar
        openSnackbarSendSMSError();
      }
    }
  };

  const vertifySMS = async () => {
    if (otp.length < 6) {
      setOtpError(true);
    }
    try {
      let confirmationResult = window.confirmationResult;
      const UserCredentialImpl = await confirmationResult.confirm(otp);
      if (UserCredentialImpl) {
        setOtpError(false);

        dispatch(setUser(UserCredentialImpl));
        saveIdTokenToLocalStorage(UserCredentialImpl._tokenResponse.idToken);

        openSnackbarVertifyOTPSuccess();
        setTimeout(handleCloseLoginDialog, 2000);
      } else {
        setOtpError(true);
        openSnackbarVertifyOTPError();
        reGenerateRecaptcha();
      }
    } catch (error) {
      console.log(error);
      setOtpError(true);
      openSnackbarVertifyOTPError();

      reGenerateRecaptcha();
    }
  };

  const { values, errors, handleChange, handleSubmit, submitCount } = useFormik({
    validationSchema: LoginValidationSchema,
    initialValues: initialValues,
    onSubmit: onSubmit,
    validateOnBlur: true,
  });
  const submited = submitCount > 0;

  return (
    <>
      <Dialog onClose={handleCloseLoginDialog} open={open}>
        <MainSnackbar
          open={openSnackbar}
          close={handleCloseSnackbar}
          message={messageSnackbar}
          severity={severitySnackbar}
        />
        <DialogTitle textAlign={'center'}>{!isOpenVertify ? LOGIN_TITLE : VERTIFY_TITLE}</DialogTitle>
        <List sx={{ pt: 0 }}>
          <SCForm onSubmit={(event) => handleSubmit(event)}>
            {isOpenVertify ? (
              <>
                <SCOtpInput
                  value={otp}
                  onChange={(code: React.SetStateAction<string>) => setOtp(code)}
                  numInputs={6}
                  separator={<span style={{ width: '8px' }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    width: '46px',
                    height: '46px',
                    fontSize: '12px',
                    color: '#000',
                    fontWeight: '400',
                    caretColor: 'blue',
                  }}
                  focusStyle={{
                    border: '1px solid #CFD3DB',
                    outline: 'none',
                  }}
                />
                <SCError>{isOtpError && 'Invalid otp'}</SCError>
                <SCButton variant="contained" color="secondary" onClick={backToSendSMS}>
                  Back
                </SCButton>
                <SCButton variant="contained" color="success" onClick={vertifySMS}>
                  Vertify
                </SCButton>
              </>
            ) : (
              <>
                <SCPhoneInput
                  id="phoneNumber"
                  defaultCountry="VN"
                  country="ca"
                  value={phoneNumber}
                  onChange={(number: any) => setPhoneNumber(number)}
                />
                {/* <SCError></SCError> */}
                {/* <SCTextField
                  type={'password'}
                  id="password"
                  label="password"
                  variant="outlined"
                  size="small"
                  value={values.password}
                  onChange={handleChange}
                />
                <SCError>{submited && !!errors.password && errors.password}</SCError>
                <SCTextField
                  type={'password'}
                  id="confirmPassword"
                  label="confirmPassword"
                  variant="outlined"
                  size="small"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                <SCError>{submited && !!errors.confirmPassword && errors.confirmPassword}</SCError> */}
                {/* <SCError>{submited && !errors.password && !errors.confirmPassword && 'To many requests SMS'}</SCError> */}
                <SCButton type="submit" variant="contained">
                  Submit
                </SCButton>
              </>
            )}
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
const SCOtpInput = styled(OtpInput)`
  font-size: 1.8rem;
  > input {
    border-radius: 50%;
  }
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

export default LogInDialog;
