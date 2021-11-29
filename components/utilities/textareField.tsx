import { handleInputChange } from "../functionsUtilities.ts";


interface TextAreaProps {
  name: string,
  labelTag: string,
  span?: JSX.Element | null,
  required?: boolean,
  maxLength?: number | null
}

export const TextAreaField = ( {name, labelTag, span, required=false, maxLength=null}: TextAreaProps ) =>{

  return (
    <div className="textarea__holder">
      <textarea className="textarea"
        name={name} 
        id={name}
        aria-required={required? "true" : "false"} 
        onChange={handleInputChange}
        maxLength={maxLength? maxLength : undefined}/>
      <label className="textarea__label" 
        htmlFor={name}>
          {labelTag}
          {span}
      </label>
    </div>
  )
}