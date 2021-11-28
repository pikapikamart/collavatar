import React from "react";


export function handleInputChange( event: React.ChangeEvent ): void{
  const { target } = event;

  if ( target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ) {
    target.value? target.classList.add("typing") : target.classList.remove("typing");
  }
} 