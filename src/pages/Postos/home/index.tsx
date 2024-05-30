import { Loading } from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { IGetPostos } from '@/hooks/fetchs/types'
import { getPosts } from '@/hooks/mutations'
import { useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location'
import { Box } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { CardDetails } from '../components/CardDetails'
import { ListPostosByTypeUser } from '../components/ListPostosByTypeUser'
import * as S from './styles'
interface ICoords {
  coords: Coords;
  timestamp: number;
}

interface Coords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}


const fetch = new UseFatch()
export function Postos() {
  const { user } = useAuth()
  const [placa, setPlaca] = React.useState<string>(user!.placas.length === 1 ? user!.placas[0] : '')
  const { mutateAsync, isLoading } = getPosts()

  // const [location, setLocation] = useState<ICoords | null>(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = React.useState<IGetPostos[]>([])


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const rs = await mutateAsync({
        Latitude: location!.coords.latitude,
        Longitude: location!.coords.longitude
      })

      setData(rs)
    })();
  }, []);

  useFocusEffect(useCallback(() => {

    if (user?.placas.length === 1) {
      setPlaca(user.placas[0])
    } else {
      setPlaca('')
    }
  }, []))


  if (isLoading) return <Loading />

  return (
    <S.Container>

      {placa ? (

        <Box style={{ gap: 8 }} >
          <FlatList
            data={data}
            keyExtractor={h => h.id}
            renderItem={({ item: h }) => (
              <CardDetails item={h} />
            )}
          />
        </Box>

      ) : (
        <ListPostosByTypeUser setItem={h => setPlaca(h)} />
      )}
    </S.Container>
  )
}