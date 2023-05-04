import { useField } from "formik";

interface selectprops {
  label: string;
  name: string;
  placeholder: string;
  // Add other props here
}

const Select = ({ label, placeholder, name, ...props }: selectprops) => {
  const [field, meta] = useField({ name, ...props });

  return (
    <>
      <label>{label}</label>
      <select
        {...field}
        {...props}
        placeholder={placeholder}
        className={meta.touched && meta.error ? "input-error" : ""}
      ></select>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};
export default Select;
