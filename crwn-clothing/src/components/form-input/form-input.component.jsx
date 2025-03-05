import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div class="group">
      <input
        class="form-input
            "
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label
          class={`${otherProps.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};
export default FormInput;
