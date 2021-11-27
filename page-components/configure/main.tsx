import ModalOverlay from "@/components/utilities/modal-overlay";
import ConfigureHero from "@/components/configure/hero";


const ConfigurationPage = () =>{
  
  return (
    <main >
      <ModalOverlay>
        <ConfigureHero />
      </ModalOverlay>
    </main>
  )
};


export default ConfigurationPage;