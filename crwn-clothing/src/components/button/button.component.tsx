import {
  BaseButton,
  GoogleSignInButton,
  InveretedButton,
  ButtonSpinner,
} from "./button.styles";
import { ButtonHTMLAttributes, FC } from "react";
export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

const getButton = (
  buttonType = BUTTON_TYPE_CLASSES.base
): typeof BaseButton => {
  return {
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InveretedButton,
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
  }[buttonType];
};
export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};
export default Button;
