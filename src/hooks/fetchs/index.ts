
import { api_glas } from '@/services/api-glas';
import { apiMega } from '@/services/api-mega';
import { TDetailPostos, TGerarCartao, TGetHistoricoAbastecimento, TGetHistoricoPagemento, TListPostos, TLogin, TRegisterUser } from './schemas';
import { IGetInfoPosto, IGetPostos, IHistoricoPagamento, IHomeInfo, ILoginUser, IVirtualCard } from './types';

type Params = {
  DeviceId: string;
};


export class UseFatch {

  async signIn(params: TLogin) {
    const { data } = await apiMega.post('/Usuario/login', params);

    return data;
  }

  async signUp(params: TRegisterUser) {
    const { data } = await apiMega.post('/Usuario', params);

    return data as ILoginUser;
  }
  async infoHome(userId: string) {
    const { data } = await api_glas.get('/Aplicativo/home', {
      params: {
        UsuarioId: userId,
      },
    });

    return data as IHomeInfo;
  }

  async gerarVirtualCard(input: TGerarCartao) {
    const { data } = await api_glas.get('/CartaoClub/obter-virtual', {
      params: input
    });

    return data as IVirtualCard;
  }

  async getPostos(input: TListPostos) {
    const { data } = await api_glas.get('/Posto/obter-map-app', {
      params: input
    })

    return data.result as IGetPostos[];
  }

  async getInfoPosto(input: TDetailPostos) {
    const { data } = await api_glas.get('/Posto/byId', {
      params: input
    })

    return data as IGetInfoPosto;
  }

  async getHistoricoAbastecimento(params: TGetHistoricoAbastecimento) {
    const { data } = await api_glas.get('/Associado/historico-app', { params });

    return data as IGetPostos[];
  }

  async getHistoricoPagamento(params: TGetHistoricoPagemento) {
    const { data } = await api_glas.get('/Associado/historico-pagamento', {
      params: {
        AssociadoId: params.AssociadoId,
        pageSize: 15,
        pageNumber: 0
      }
    });
    console.log({ data })
    return data.result as IHistoricoPagamento[];
  }

}

