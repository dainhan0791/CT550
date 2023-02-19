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
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setUser } from '../../redux/slices/auth.slice';
// Firebase
import { fAuth } from '../../firebase/init.firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import {
  LOGIN_TITLE,
  OTP_FIELD_ERROR,
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
  VERTIFY_OTP_SUCCESS,
  VERTIFY_OTP_ERROR,
  VERTIFY_TITLE,
} from '../../constants/login.constant';

import { saveIdTokenToLocalStorage } from '../../utils/auth.localstorage';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string>('');

  const [isOpenVertify, setIsOpenVertify] = React.useState<boolean>(false);

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
          enqueueSnackbar('reCAPTCHA solved, allow signInWithPhoneNumber', { variant: 'info' });
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          enqueueSnackbar('Response expired. Ask user to solve reCAPTCHA again', { variant: 'info' });
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
            enqueueSnackbar('reCAPTCHA solved, allow signInWithPhoneNumber', { variant: 'default' });

            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            enqueueSnackbar('Response expired. Ask user to solve reCAPTCHA again', { variant: 'default' });
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
              // Open vertify otp
              enqueueSnackbar(SEND_SMS_SUCCESS, { variant: 'success' });

              setIsOpenVertify(true);
            })
            .catch((error) => {
              // Error; SMS not sent
              enqueueSnackbar(SEND_SMS_ERROR + error.message, { variant: 'success' });

              console.log(error);
            });
        } else {
          enqueueSnackbar(SEND_SMS_ERROR, { variant: 'error' });
          reGenerateRecaptcha();
        }
      } catch (error: any) {
        console.log(error);
        enqueueSnackbar(SEND_SMS_ERROR + error.message, { variant: 'error' });

        reGenerateRecaptcha();
      }
    }
  };

  const vertifySMS = async () => {
    if (otp.length < 6) {
      enqueueSnackbar(OTP_FIELD_ERROR, { variant: 'warning' });
      return;
    }
    try {
      let confirmationResult = window.confirmationResult;
      const UserCredentialImpl = await confirmationResult.confirm(otp);
      if (UserCredentialImpl) {
        enqueueSnackbar(VERTIFY_OTP_SUCCESS, { variant: 'success' });

        dispatch(setUser(UserCredentialImpl));
        saveIdTokenToLocalStorage(UserCredentialImpl._tokenResponse.idToken);
        handleCloseLoginDialog();
      } else {
        enqueueSnackbar(VERTIFY_OTP_SUCCESS, { variant: 'error' });

        reGenerateRecaptcha();
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(VERTIFY_OTP_SUCCESS, { variant: 'error' });

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
