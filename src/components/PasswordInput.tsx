'use client';

import { useState } from 'react';

import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

import type { ControllerRenderProps, FieldError } from 'react-hook-form';

type Props = {
  field: Partial<ControllerRenderProps>;
  error?: FieldError;
  label: string;
  placeholder: string;
};

const PasswordInput = ({ field, error, label, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          isError={!!error}
          errorText={error?.message}
          endAdornment={
            <button type="button" onClick={togglePassword}>
              {showPassword ? (
                <Eye className="mr-2 h-[20px] text-neutral-200 " />
              ) : (
                <EyeOff className="mr-2 h-[20px] text-neutral-200 " />
              )}
            </button>
          }
          {...field}
        />
      </FormControl>
    </FormItem>
  );
};

export default PasswordInput;
