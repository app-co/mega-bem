import { TDetailPostos } from "@/hooks/fetchs/schemas";

type TCadastro = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

type TGenerateCard = {
  Placa: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      login: undefined;
      virtualCard: undefined;
      abastecimentoCard: undefined;
      details: TDetailPostos;
      postos: undefined
      profile: undefined
      cards: undefined
      "historico-abasstecimento": undefined;
      "historico-pagamento": undefined;
    }
  }
}
