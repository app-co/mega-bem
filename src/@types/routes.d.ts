import { TDetailPostos } from '@/hooks/fetchs/schemas';

type TCadastro = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

type TGenerateCard = TDetailPostos & {
  placa: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      login: undefined;
      virtualCard: undefined;
      abastecimentoCard: undefined;
      details: TGenerateCard;
      stakPostos: { placa: string };
      profile: undefined;
      cards: undefined;
      postos: undefined;
      'historico-abasstecimento': undefined;
      'historico-pagamento': undefined;
    }
  }
}
