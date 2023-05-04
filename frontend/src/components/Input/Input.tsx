import { useField } from "formik";

interface inputprops {
    label: string;
    name: string;
    type:string;
    placeholder:string;
  }
  
  const Input = ({ label, name, ...props }: inputprops) => {
    const [field, meta] = useField({ name, ...props });
  
  return (
    <>
      <label>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};
export default Input;