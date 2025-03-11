import{ BaseButton, GoogleSignInButton, InveretedButton, ButtonSpinner} from  './button.styles'
export const BUTTON_TYPE_CLASSES = {
  base: "base",
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
const Button = ({ children, buttonType,isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading}
      {...otherProps}
    >
      {isLoading? <ButtonSpinner/>:children}
    </CustomButton>
  );
};
export default Button;
