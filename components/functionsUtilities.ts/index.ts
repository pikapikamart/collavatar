import React from "react";


export function handleInputChange( event: React.ChangeEvent ): void{
  const { target } = event;

  if ( target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ) {
    target.value? target.classList.add("typing") : target.classList.remove("typing");
  }
} 

type TestInputError = (element: HTMLInputElement | HTMLTextAreaElement, errorId: string, limit?: number) => boolean;

export const testInputError: TestInputError = ( element, errorId, limit = 0 ) =>{

  const setErrors = () => {
    element.setAttribute("aria-invalid", "true");
    element.setAttribute("aria-describedby", errorId)
  }

  const removeErrors = () =>{
    element.removeAttribute("aria-invalid");
    element.removeAttribute("aria-describedby");
  }

  if ( element instanceof HTMLInputElement ) {
    if ( !element.value ) {
      setErrors();
      return true;
    }
  } if ( element instanceof HTMLTextAreaElement ) {
    if ( limit && element.value.length > limit ) {
      setErrors();
      return true;
    }
  }
  removeErrors();
  
  return false;
}