import React, { ReactNode } from "react"
import { handleInputChange } from "../functionsUtilities.ts";
import { UseFormElement } from "@/lib/hooks";


interface InputFieldProps {
  children: ReactNode,
  name: string,
  labelTag: string,
  register: (element: UseFormElement) => void,
  required?: boolean,
  value?: string
}

export const InputField = ( {
  children,
  name, 
  labelTag, 
  register,
  required=true, 
  value=""}: InputFieldProps 
) =>{

  return (
    <div className="input__holder">
      <input className={`input ${value? "typing" : ""}`} type="text" 
        name={name} 
        id={name}
        onChange={handleInputChange}
        defaultValue={value}
        aria-required={required? "true" : "false"}
        ref={element =>{
          element? register({
            html: element,
            errorMessageId: name + "Error",
            errorName: name
          }) : null
        }} />
      <label className="input__label"
        htmlFor={name}>{labelTag}{required? " *" : ""}
      </label>
      {/* Expecting for p tags error */}
      {children}
    </div>
  )
}