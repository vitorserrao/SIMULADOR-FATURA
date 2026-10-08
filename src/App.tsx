import React, { useState } from 'react';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { StepOneForm } from './components/StepOneForm';
import { StepTwoReport } from './components/StepTwoReport';
import { MigrationModal } from './components/MigrationModal';
import { Footer } from './components/Footer';
import { InvoiceFormData } from './types/energy';
import { calculateAudit } from './utils/calculator';

const DEFAULT_FORM: InvoiceFormData = {
  // Seção 1: Distribuidora e Modalidade
  distribuidora: 'COPEL-DIS',
  subgrupo: 'A4',
  dataReferencia: '15/03/2023',
  modalidadeAtual: 'convencional',
  bandeiraAutomatica: true,
  bandeira: 'verde',

  // Seção 2: Consumo Ativo e Demanda Registrada
  consumoPonta: 55,
  consumoForaPonta: 9094,
  consumoIntermediario: 0,
  demandaMedida: 150.65,
  demandaContratada: 260,
  demandaIsentaIcms: 109.35,

  // Outras Parcelas e Mercado Livre (ACL)
  outrosValores: 115.01,
  percentualConsumoMesAnterior: 0,
  precoMedioACL: 312.4,

  // Seção 3: Reativos
  buscarReativoAuto: true,
  consumoReativoPonta: 0,
  consumoReativoForaPonta: 9,
  demandaReativaPonta: 0,
  demandaReativaForaPonta: 0,

  // Seção 4: Tributos
  aplicarTributos: true,
  pis: 0.95,
  cofins: 4.38,
  icms: 18,
  tipoIcms: 'fora',
  cipCosip: 0,

  // Metadados
  ucCode: '1049283-0',
  unidadeNome: 'Matriz',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<InvoiceFormData>(DEFAULT_FORM);
  const [isMigrationOpen, setIsMigrationOpen] = useState(false);

  const auditResult = calculateAudit(formData);

  const handleGoToStep = (step: 1 | 2) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFillExample = () => {
    setFormData({
      ...DEFAULT_FORM,
      distribuidora: 'COPEL-DIS',
      subgrupo: 'A4',
      dataReferencia: '15/03/2023',
      modalidadeAtual: 'convencional',
      bandeiraAutomatica: true,
      bandeira: 'verde',
      consumoPonta: 55,
      consumoForaPonta: 9094,
      consumoIntermediario: 0,
      demandaMedida: 150.65,
      demandaContratada: 260,
      demandaIsentaIcms: 109.35,
      outrosValores: 115.01,
      percentualConsumoMesAnterior: 0,
      precoMedioACL: 312.4,
      buscarReativoAuto: true,
      consumoReativoPonta: 0,
      consumoReativoForaPonta: 9,
      demandaReativaPonta: 0,
      demandaReativaForaPonta: 0,
      aplicarTributos: true,
      pis: 0.95,
      cofins: 4.38,
      icms: 18,
      tipoIcms: 'fora',
      cipCosip: 0,
    });
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="bg-[#f8fafc] font-sans text-slate-900 antialiased min-h-screen flex flex-col justify-between selection:bg-amber-300 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="w-full flex-grow py-8 px-4 sm:px-6">
        <div className={`mx-auto ${currentStep === 1 ? 'max-w-4xl' : 'max-w-6xl'}`}>
          {/* Progress Stepper */}
          <Stepper currentStep={currentStep} onGoToStep={handleGoToStep} />

          {/* Step 1 View */}
          {currentStep === 1 && (
            <StepOneForm
              formData={formData}
              onChange={setFormData}
              onSubmit={() => handleGoToStep(2)}
              onFillExample={handleFillExample}
            />
          )}

          {/* Step 2 View */}
          {currentStep === 2 && (
            <StepTwoReport
              audit={auditResult}
              formData={formData}
              onBackToEdit={() => handleGoToStep(1)}
              onRequestMigration={() => setIsMigrationOpen(true)}
              onExportPdf={handleExportPdf}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Modal de Requerimento de Migração */}
      <MigrationModal
        isOpen={isMigrationOpen}
        onClose={() => setIsMigrationOpen(false)}
        audit={auditResult}
        formData={formData}
      />
    </div>
  );
}
