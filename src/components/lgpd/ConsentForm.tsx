import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const ConsentForm: React.FC = () => {
  const [hasConsented, setHasConsented] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsent = () => {
    setHasConsented(true);
    alert('Consentimento registrado com sucesso!');
  };

  return (
    <div className="consent-form">
      <h1>Termo de Aceite - LGPD</h1>
      <p>
        Ao continuar, você concorda com os termos de uso e a política de privacidade
        conforme exigido pela Lei Geral de Proteção de Dados (LGPD).
      </p>
      {!hasConsented ? (
        <div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            Ler Termos
          </button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Termos de Uso e Política de Privacidade</DialogTitle>
              </DialogHeader>
              <div className="modal-content">
                <p>
                  Este é o termo de aceite conforme exigido pela Lei Geral de Proteção de Dados (LGPD).
                  Ao aceitar, você concorda com o uso de seus dados conforme descrito neste documento.
                </p>
                <p>
                  [Insira aqui o texto completo do termo de uso e política de privacidade.]
                </p>
                <button onClick={handleConsent} className="btn-primary mt-4">
                  Aceitar Termos
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <p>Obrigado por aceitar os termos.</p>
      )}
    </div>
  );
};

export default ConsentForm;