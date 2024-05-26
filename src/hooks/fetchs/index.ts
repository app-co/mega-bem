
import { api_glas } from '@/services/api-glas';
import { apiMega } from '@/services/api-mega';
import { TDetailPostos, TGerarCartao, TGetHistoricoAbastecimento, TGetHistoricoPagemento, TListPostos, TLogin, TPlanoAssociado, TRegisterUser, TUpdateUser, schemaUpdateUser } from './schemas';
import { IGetInfoPosto, IGetPostos, IHistoricoAbastecimento, IHistoricoPagamento, IHomeInfo, ILoginUser, IPlanoAssociado, IUser, IVirtualCard } from './types';

type Params = {
  DeviceId: string;
};


export class UseFatch {

  async signIn(params: TLogin) {
    const { data } = await apiMega.post('/Usuario/login', params);

    return data as IUser;
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
    const { data } = await api_glas.get('/Associado/historico-abastecimento', { params });

    return data as IHistoricoAbastecimento
  }

  async getHistoricoPagamento(params: TGetHistoricoPagemento) {
    const { data } = await apiMega.get('/Associado/historico-pagamento', {
      params: {
        AssociadoId: params.AssociadoId,
        pageSize: 10,
        pageNumber: 0,
      }
    });
    return data.result as IHistoricoPagamento[];
  }

  async getPlanoAssociado(params: TPlanoAssociado) {
    const { data } = await apiMega.get('/PlanoDuracao/obter-plano-associado', {
      params: {
        CpfCnpj: params.CpfCnpj,
      }
    });

    return data as IPlanoAssociado;
  }
  async updateUser(params: TUpdateUser) {
    schemaUpdateUser.parse(params)
    const { data } = await apiMega.put('/Usuario/App', {
      params: {
        nomeCompleto: params.nomeCompleto,
        email: params.email,
        senha: params.senha,
        usuarioId: params.usuarioId,
        foto: params.foto
      }
    });

    return data as IPlanoAssociado;
  }
  async getUser(params: { usuarioId: string }) {
    const { data } = await apiMega.put('/Usuario/App', {
      params: {
        UsuarioId: params.usuarioId,
      }
    });

    return data as IPlanoAssociado;
  }

}

