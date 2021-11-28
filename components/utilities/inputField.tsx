import React from "react"
import { handleInputChange } from "../functionsUtilities.ts";


interface InputFieldProps {
  name: string,
  labelTag: string,
  required?: boolean ,
  value?: string
}

export const InputField = ( {name, labelTag, required=true, value=""}: InputFieldProps ) =>{

  return (
    <div className="input__holder">
      <input className={`input ${value? "typing" : ""}`} 
        type="text" 
        name={name} 
        id={name}
        onChange={handleInputChange}
        defaultValue={value}
        aria-required={required? "true" : "false"} />
      <label className="input__label"
        htmlFor={name}>{labelTag}{required? " *" : ""}</label>
    </div>
  )
}