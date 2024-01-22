import {useForm} from 'react-hook-form';
import React from 'react';
import {FormData, People} from '@/app/components/@types';
import {peoplesMock} from '@/app/mock';
import {Alert, AutocompleteRenderInputParams, Button, CircularProgress, Snackbar, TextField} from '@mui/material';
import AutocompleteField from '@/app/components/AutocompleteField';
import './Form.css';

export const Form = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      people: null,
    },
  });
  const [peoples, setPeoples] = React.useState<People[]>([]);

  React.useEffect(() => {
    setPeoples(peoplesMock);  // Simulação de uma requisição
  }, []);

  const renderInput = (params: object) => (
    <TextField
      {...(params as AutocompleteRenderInputParams)}
      label="Pessoa"
      InputProps={{
        ...(params as AutocompleteRenderInputParams).InputProps,
        endAdornment: (
          <>
            {peoples.length === 0 ? <CircularProgress color="inherit" size={20}/> : null}
            {(params as AutocompleteRenderInputParams).InputProps.endAdornment}
          </>
        ),
      }}
    />
  );

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <Snackbar
        open={!!errors.phone}
        autoHideDuration={3000}
        onClose={() => {
          clearErrors('phone');
        }}>
        <Alert onClose={() => {
          clearErrors('phone');
        }} severity="error">
          {errors.phone?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errors.email}
        autoHideDuration={3000}
        sx={{width: '100%', marginBottom: '50px'}}
        onClose={() => {
          clearErrors('email');
        }}>
        <Alert onClose={() => {
          clearErrors('email');
        }} severity="error">
          {errors.email?.message}
        </Alert>
      </Snackbar>
      <h2 className="peopleFormTitle">Formulário</h2>
      <form className="peopleForm" onSubmit={handleSubmit(onSubmit)}>
        <AutocompleteField
          isOptionEqualToValue={(option, value) => (option as People).name === (value as People).name}
          getOptionLabel={(option) => (option as People).name}
          options={peoples}
          loading={peoples.length === 0}
          renderInput={renderInput}
          control={control}
          controlName="people"
          onChanger={(onChange: (value: { name: string } | null) => void) => (_event, value: any) => {
            if (value) {
              onChange(value.name);
            } else {
              onChange(null);
            }
          }}
        />
        <TextField
          label="Telefone"
          type="tel"
          error={!!errors.phone}
          {...register('phone', {required: 'O campo de telefone é obrigatório', minLength: {value: 10, message: 'Telefone inválido'}, maxLength: 11, pattern: /^[0-9]+$/i})}
        />
        <TextField
          label="E-Mail"
          type="email"
          error={!!errors.email}
          {...register('email', {required: 'O campo de email é obrigatório', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i})}
        />
        <Button type="submit" variant="contained">Enviar</Button>
      </form>
    </>
  );
};
