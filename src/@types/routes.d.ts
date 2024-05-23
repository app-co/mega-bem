import { TDetailPostos } from "@/hooks/fetchs/schemas";

type TCadastro = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      login: undefined;
      virtualCard: undefined;
      abastecimentoCard: undefined;
      details: TDetailPostos;
      "historico-abasstecimento": undefined;
      "historico-pagamento": undefined;
    }
  }
}
