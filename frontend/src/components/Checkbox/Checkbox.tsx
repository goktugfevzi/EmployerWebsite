import { useField } from "formik";
interface checkboxprops {
  label: string;
  name: string;
  type: string;
  // Add other props here
}
const Checkbox = ({ label, name, ...props }: checkboxprops) => {
  const [field, meta] = useField({ name, ...props });

  return (
    <>
      <div className="checkbox">
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span>I accept the terms of service</span>
      </div>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};
export default Checkbox;
