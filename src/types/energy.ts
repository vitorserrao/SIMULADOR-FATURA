export type TariffModalidade =
  | 'verde'
  | 'azul'
  | 'optante_b'
  | 'grupo_b'
  | 'branca'
  | 'convencional';

export type BandeiraTarifaria = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

export type TipoICMS = 'fora' | 'dentro';

export interface Distributor {
  id: string;
  sigAgente: string;
  name: string;
  state: string;
  region: string;
  subgroups: string[];
  baseTusdDemanda: number; // R$/kW
  baseTePonta: number; // R$/kWh
  baseTeForaPonta: number; // R$/kWh
  baseTusdPonta: number;
  baseTusdForaPonta: number;
  baseConvencionalKwh: number;
}

export interface InvoiceFormData {
  // Seção 1: Distribuidora e Modalidade
  distribuidora: string; // sig_agente (ex: COPEL-DIS, ENEL-SP, CEMIG-D, etc.)
  subgrupo: string; // A4, A3a, A2, B3, Optante B
  dataReferencia: string; // 15/03/2023
  modalidadeAtual: TariffModalidade;
  bandeiraAutomatica: boolean;
  bandeira: BandeiraTarifaria;

  // Seção 2: Consumo Ativo e Demanda Registrada
  consumoPonta: number; // kWh
  consumoForaPonta: number; // kWh
  consumoIntermediario: number; // kWh
  demandaMedida: number; // kW
  demandaContratada: number; // kW
  demandaIsentaIcms: number; // kW (opcional)

  // Outras Parcelas e Mercado Livre (ACL)
  outrosValores: number; // R$
  percentualConsumoMesAnterior: number; // fração
  precoMedioACL: number; // R$/MWh (0 = desativa)

  // Seção 3: Reativos
  buscarReativoAuto: boolean;
  consumoReativoPonta: number; // kVArh
  consumoReativoForaPonta: number; // kVArh
  demandaReativaPonta: number; // kVAr
  demandaReativaForaPonta: number; // kVAr

  // Seção 4: Tributos
  aplicarTributos: boolean;
  pis: number; // % (ex: 0.95)
  cofins: number; // % (ex: 4.38)
  icms: number; // % (ex: 18)
  tipoIcms: TipoICMS; // 'fora' | 'dentro'
  cipCosip: number; // R$

  // Metadados
  ucCode: string;
  unidadeNome: string;
}

export interface TableItemBreakdown {
  descricao: string;
  subtitulo: string;
  baseConsumo: string;
  tarifaHomologada?: string;
  tarifaSemTributo: string;
  tarifaComTributo: string;
  valorTotal: string;
  valorNum: number;
  dotColor: string;
}

export interface ModalidadeTeTusd {
  key: string;
  nome: string;
  custoTotal: number;
  teValor: number;
  tusdValor: number;
  tePct: number;
  tusdPct: number;
  descricaoRegulatoria: string;
  tag?: string;
  tagColor?: string;
}

export interface AuditResult {
  simId: string;
  distribuidoraNome: string;
  sigAgente: string;
  subgrupo: string;
  demandaFaturavelKw: number;
  demandaContratadaKw: number;
  consumoTotalCicloKwh: number;
  modalidadeRecomendadaNome: string;
  modalidadeRecomendadaKey: TariffModalidade;
  custoAtual: number;
  novoCusto: number;
  economiaMensal: number;
  economiaPercentual: number;
  economiaAnual: number;
  custoAzul: number;
  custoConvencional: number;
  custoVerde: number;
  custoACL: number;
  custoBranca: number;
  diferencaAzulVsVerde: number;
  sobreprecoConvencionalPct: number;
  consumoPontaPercentual: number;
  consumoForaPontaPercentual: number;
  breakdown: TableItemBreakdown[];
  totalOtimizado: number;
  composicao: {
    energiaPct: number;
    tusdPct: number;
    tributosPct: number;
  };
  comparativoTeTusd: ModalidadeTeTusd[];
  reativosTotal: number;
  tributosTotaisEstimados: number;
  tributosPercentual: number;
}
