import React, { useCallback, useEffect } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const regex = /[^a-zA-Z\s\-\u0400-\u04FF]+/
  let message = 'Поле может содержать только кириллицу, латиницу, пробел, дефис';

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
 
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  
    if(name === 'name') {
      regex.test(value) && setErrors({...errors, [name]: message });
      setIsValid(target.closest("form").checkValidity() && !regex.test(value));
    } 
  };
  

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}