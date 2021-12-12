

interface SubmitButtonProps {
  type: "submit" | "button" | "reset",
  text: string
}

export const SubmitButton = ( {type="button", text}:SubmitButtonProps ) =>{

  return (
    <button className="btn btn__submit"
      type={type}>
        {text}
    </button>
  )
}