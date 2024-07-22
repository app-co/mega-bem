import { useQuery } from 'react-query';

import { UseFatch } from '../fetchs';
import { TGerarCartao } from '../fetchs/schemas';

const fetch = new UseFatch();

export function useVirtualCard(params: TGerarCartao) {
  return useQuery({
    queryKey: ['megabem@virtualCard', params],
    queryFn: () => fetch.gerarVirtualCard(params),
  });
}
