import {BaseButton, GoogleSignInButton, InveretedButton} from './button.styles'
const BUTTON_TYPE_CLASSES = {
  base:"base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InveretedButton,
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
  }[buttonType];
}
const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};
export default Button;
