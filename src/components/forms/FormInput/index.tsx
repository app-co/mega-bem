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
  mask?: 'date' | 'cpf' | 'cell-phone' | 'placa'
};

const msk = new Mask()
export function FormInput({ name, control, mask, error, ...rest }: T) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {

        const mascars: any = {
          date: (e: string) => e ? e.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3') : '',
          cpf: (e: string) => {
            if (e && e.length > 11) {
              const mascara = e.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4 - $5')
              return mascara
            }

            if (e && e.length === 11) {
              const mascara = e.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
              return mascara
            }
          },
          'cell-phone': (e: string) => e ? e.replace(/(\d{5})(\d{4})/, '$1.$2') : '',
          placa: (e: string) => e ? e.replace(/^([A-Z]{3})-([0-9]{4})$/, '$1-$2') : '',
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
