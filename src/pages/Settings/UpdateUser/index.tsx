import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { useAuth } from '@/contexts/auth'
import { TUpdateUser } from '@/hooks/fetchs/schemas'
import * as mutation from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { Feather } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { Avatar, useToast } from 'native-base'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { ZodError, z } from 'zod'
import * as S from './styles'

export function UpdateUser() {
  const { user, updateUser } = useAuth()
  const { mutateAsync } = mutation.updateUser()
  const [image, setImage] = useState<string | null>(user!.fotoUrl ?? null);
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<TUpdateUser>({
    resolver: zodResolver(z.object({
      nomeCompleto: z.string(),
      email: z.string(),
      senha: z.string().optional(),
    })),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nomeCompleto: user?.nome,
      email: user?.email,
      senha: ''
    }
  })

  const submit = React.useCallback(async (input: TUpdateUser) => {
    setLoading(true)
    try {
      const dt = {
        ...input,
        usuarioId: user!.usuarioId,
        foto: image!

      }
      await mutateAsync(dt)
      updateUser(user!.usuarioId)
      toast.show({
        title: 'Sucesso',
        description: 'Dados atualizados com sucesso',
        bg: 'green.500',
        placement: 'top'
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)

      if (error instanceof AppError) {
        toast.show({
          title: 'Erro',
          description: error.message,
          bg: 'red.500',
          placement: 'top'
        })
      }

      if (error instanceof ZodError) {
        toast.show({
          title: error.issues[0].path,
          description: error.issues[0].message,
          bg: 'red.500',
          placement: 'top'
        })
      }
    }
  }, [image])

  return (
    <S.Container>

      {image ? (
        <TouchableOpacity onPress={pickImage} style={{ alignSelf: 'center' }} >
          <Avatar size={'xl'} source={{ uri: image }} />

        </TouchableOpacity>

      ) : (
        <S.boxAvatar onPress={pickImage} >
          <Feather name='user' size={45} />
        </S.boxAvatar>
      )}


      <S.title>Informaçoes pessoais</S.title>

      <S.body>
        <FormInput
          control={control}
          error={errors.nomeCompleto}
          name='nomeCompleto'
          placeholder='Nome completo'
          label='Nome completo'
        />

        <FormInput
          control={control}
          error={errors.email}
          name='email'
          placeholder='Digite seu email'
          label='E-mail'
        />

        <FormInput
          control={control}
          error={errors.senha}
          name='senha'
          placeholder='Nova senha'
          label='Atualizar senha'
        />

        <Button load={loading} onPress={handleSubmit(submit)} />

      </S.body>
    </S.Container>
  )
}