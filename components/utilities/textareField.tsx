import { ReactNode } from "react";
import { handleInputChange } from "../functionsUtilities.ts";
import { UseFormElement } from "@/lib/hooks";


interface TextAreaProps {
  children: ReactNode,
  name: string,
  labelTag: string,
  register: (element: UseFormElement) => void,
  span?: JSX.Element,
  required?: boolean,
  maxLength?: number | null
}

export const TextAreaField = ( {
  children,
  name, 
  labelTag, 
  span,
  register,
  required=false, 
  maxLength=null}: TextAreaProps 
) =>{

  return (
    <div className="textarea__holder">
      <textarea className="textarea" name={name}  id={name}
        aria-required={required? "true" : "false"} 
        onChange={handleInputChange}
        maxLength={maxLength? maxLength : undefined}
        ref={ element => {
          element? register({
            html: element,
            errorMessageId: name + "Error",
            errorName: name
          }) : null;
        }}/>
      <label className="textarea__label" htmlFor={name}>
        {labelTag}
        {span?? null}
      </label>
      {children}
    </div>
  )
}