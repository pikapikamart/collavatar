import { handleInputChange } from "../functionsUtilities.ts";


interface TextAreaProps {
  name: string,
  labelTag: string,
  required?: boolean,
  span?: JSX.Element | null
}

export const TextAreaField = ( {name, labelTag, required=false, span}: TextAreaProps ) =>{

  return (
    <div className="textarea__holder">
      <textarea className="textarea" 
        name={name} 
        id={name}
        aria-required={required? "true" : "false"} 
        onChange={handleInputChange}/>
      <label className="textarea__label" 
        htmlFor={name}>
          {labelTag}
          {span}
      </label>
    </div>
  )
}