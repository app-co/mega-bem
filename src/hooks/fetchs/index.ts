/* eslint-disable class-methods-use-this */
import { api_glas } from '@/services/api-glas';
import { apiMega } from '@/services/api-mega';

import {
  TDetailPostos,
  TGerarCartao,
  TGetHistoricoAbastecimento,
  TGetHistoricoPagemento,
  TListPostos,
  TLogin,
  TPlanoAssociado,
  TRegisterUser,
  TUpdateUser
} from './schemas';
import {
  IGetInfoPosto,
  IGetPostos,
  IHistoricoAbastecimento,
  IHistoricoPagamento,
  IHomeInfo,
  ILoginUser,
  IPlanoAssociado,
  IUser,
  IUserById,
  IVirtualCard,
} from './types';

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

  async gerarVirtualCard(params: TGerarCartao) {
    const { data } = await api_glas.get('/CartaoClub/obter-virtual', {
      params,
    });

    const dt = {
      ...data,
      placa: params.Placa,
    };

    return dt as IVirtualCard;
  }

  async getPostos(params: TListPostos) {
    const { data } = await api_glas.get('/Posto/obter-map-app', {
      params,
    });

    return data.result as IGetPostos[];
  }

  async getInfoPosto(input: TDetailPostos) {
    const { data } = await api_glas.get('/Posto/byId', {
      params: input,
    });

    return data as IGetInfoPosto;
  }

  async getHistoricoAbastecimento(params: TGetHistoricoAbastecimento) {
    const { data } = await api_glas.get('/Associado/historico-abastecimento', {
      params,
    });

    return data.result[0] as IHistoricoAbastecimento;
  }

  async getHistoricoPagamento(params: TGetHistoricoPagemento) {
    const { data } = await apiMega.get('/Associado/historico-pagamento', {
      params: {
        AssociadoId: params.AssociadoId,
        pageSize: 10,
        pageNumber: 0,
      },
    });
    return data.result as IHistoricoPagamento[];
  }

  async getPlanoAssociado(params: TPlanoAssociado) {
    const { data } = await apiMega.get('/PlanoDuracao/obter-plano-associado', {
      params: {
        CpfCnpj: params.CpfCnpj,
      },
    });

    return data as IPlanoAssociado;
  }

  async updateUser(objeto: TUpdateUser) {
    // schemaUpdateUser.parse(objeto);
    const formData = new FormData();
    // formData.append('UsuarioId', objeto.usuarioId);
    // formData.append('NomeCompleto', objeto.nomeCompleto);
    // formData.append('Email', objeto.email);
    // formData.append('Foto', {
    //   uri: objeto.foto.uri,
    //   type: 'image/png',
    //   fileName: objeto.foto.fileName,
    // });
    // formData.append('senha', objeto.senha);

    const { data } = await apiMega.put('/Usuario/App', objeto);

    return data as IPlanoAssociado;

    // const response = await fetch(
    //   'https://prd-megabem-api.azurewebsites.net/api/v1/Usuario/App',
    //   {
    //     method: 'PUT',
    //     body: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async getUserByID(params: { usuarioId: string }) {
    const { data } = await apiMega.get('/Usuario/App', {
      params: {
        UsuarioId: params.usuarioId,
      },
    });

    return data.result as IUserById;
  }
}
