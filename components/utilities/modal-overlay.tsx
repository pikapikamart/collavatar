import { ReactNode } from "react"


interface ModalOverlayProps {
  children: ReactNode
}

const ModalOverlay = ({ children }: ModalOverlayProps) =>{

  return (
    <div className="modal-overlay">
      {children}
    </div>
  );
}

export default ModalOverlay;