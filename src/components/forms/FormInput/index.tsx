/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Mask } from '@/utils/mask';
import { Input, TypeInput } from '../Input';

type T = TypeInput & {
  name: string;
  control: Control<any>;
  error?: FieldError;
  mask?: 'date' | 'cpf' | 'cell-phone'
};

const msk = new Mask()
export function FormInput({ name, control, mask, error, ...rest }: T) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const mascars: any = {
          date: (value: string) => value ? value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3') : '',
          cpf: (value: string) => value ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '',
          'cell-phone': (value: string) => value ? value.replace(/(\d{5})(\d{4})/, '$1.$2') : ''
        }

        const m = mascars[mask]

        return (
          <Input
            error={error ? error.message : ''}
            value={mask ? m(value) : value}
            onChangeText={onChange}
            {...rest}
          />
        )
      }}
    />
  );
}
