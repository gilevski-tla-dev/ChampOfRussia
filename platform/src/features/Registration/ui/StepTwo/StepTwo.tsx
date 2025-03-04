import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validateLogin,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

interface RegistrationStep2Props {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  onLoginChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export const RegistrationStep2: React.FC<RegistrationStep2Props> = ({
  login,
  email,
  password,
  confirmPassword,
  onLoginChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}) => {
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="items-center gap-1.5">
        <Label size="text-lg" htmlFor="login" className="mb-4 text-[#333333]">
          Логин <span style={{color: '#D82C20'}}>*</span>
        </Label>
        <Input
          type="text"
          id="login"
          placeholder="Придумайте логин"
          value={login}
          onChange={(e) => {
            onLoginChange(e.target.value);
            setLoginError(validateLogin(e.target.value));
          }}
        />
        {loginError && <div className="text-red-500">{loginError}</div>}
      </div>

      <div className="items-center gap-1.5">
        <Label size="text-lg" htmlFor="email" className="text-[#333333]">
          Email <span style={{color: '#D82C20'}}>*</span>
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => {
            onEmailChange(e.target.value);
            setEmailError(validateEmail(e.target.value));
          }}
        />
        {emailError && <div className="text-red-500">{emailError}</div>}
      </div>

      <div className="items-center gap-1.5">
        <Label size="text-lg" htmlFor="password" className="text-[#333333]">
          Пароль <span style={{color: '#D82C20'}}>*</span>
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            onPasswordChange(e.target.value);
            setPasswordError(validatePassword(e.target.value));
          }}
        />
        {passwordError && <div className="text-red-500">{passwordError}</div>}
      </div>

      <div className="items-center gap-1.5">
        <Label
          size="text-lg"
          htmlFor="confirmPassword"
          className="text-[#333333]"
        >
          Повторите пароль <span style={{color: '#D82C20'}}>*</span>
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => {
            onConfirmPasswordChange(e.target.value);
            setConfirmPasswordError(
              validateConfirmPassword(e.target.value, password)
            );
          }}
        />
        {confirmPasswordError && (
          <div className="text-red-500">{confirmPasswordError}</div>
        )}
      </div>
    </div>
  );
};
