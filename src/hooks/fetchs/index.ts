
import { api_glas } from '@/services/api-glas';
import { apiMega } from '@/services/api-mega';
import { TDetailPostos, TGerarCartao, TGetHistoricoAbastecimento, TGetHistoricoPagemento, TListPostos, TLogin, TPlanoAssociado, TRegisterUser, TUpdateUser, schemaUpdateUser } from './schemas';
import { IGetInfoPosto, IGetPostos, IHistoricoAbastecimento, IHistoricoPagamento, IHomeInfo, ILoginUser, IPlanoAssociado, IUser, IUserById, IVirtualCard } from './types';

type Params = {
  DeviceId: string;
};


export class UseFatch {

  async signIn(params: TLogin) {
    const { data } = await apiMega.post('/Usuario/login', params);

    return data as IUser;
  }

  async signUp(params: TRegisterUser) {
    const { data } = await apiMega.post('/Usuario/App', params);

    return data as ILoginUser;
  }
  async infoHome(CpfCnpj: string) {
    const { data } = await api_glas.get('/Aplicativo/total-economizado', {
      params: {
        CpfCnpj,
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

  async getPostos(params: TListPostos) {
    const { data } = await api_glas.get('/Posto/obter-map-app', {
      params
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

    return data.result[0] as IHistoricoAbastecimento
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
    console.log({ params })
    schemaUpdateUser.parse(params)
    const formData = new FormData();
    formData.append('usuarioId', params.usuarioId);
    formData.append('nomeCompleto', params.nomeCompleto);
    formData.append('email', params.email);
    formData.append('foto', params.foto);
    formData.append('senha', params.senha);


    const { data } = await apiMega.put('/Usuario/App', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data as IPlanoAssociado;
  }
  async getUserByID(params: { usuarioId: string }) {
    const { data } = await apiMega.get('/Usuario/App', {
      params: {
        UsuarioId: params.usuarioId,
      }
    });

    return data.result as IUserById;
  }

}

