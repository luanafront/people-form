import {useForm} from 'react-hook-form';
import React from 'react';
import {FormData, People} from '@/app/components/@types';
import {peoplesMock} from '@/app/mock';
import {Alert, AutocompleteRenderInputParams, Button, Snackbar, TextField} from '@mui/material';
import AutocompleteField from '@/app/components/AutocompleteField';
import './Form.css';
import {debounce} from '@/app/debounce';

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
  const [peopleSearch, setPeopleSearch] = React.useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(peopleSearch);

  const debouncedSetPeopleSearch = debounce((searchTerm: string) => {
    setDebouncedSearchTerm(searchTerm);
  }, 500);

  React.useEffect(() => {
    if(debouncedSearchTerm) {
      setPeoples(peoplesMock.filter((people) =>
        people.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ));
    } else {
      setPeoples([]);
    }
  }, [debouncedSearchTerm]);

  const renderInput = (params: object) => (
    <TextField
      {...(params as AutocompleteRenderInputParams)}
      label="Pessoa"
      InputProps={{
        ...(params as AutocompleteRenderInputParams).InputProps,
      }}
      value={peopleSearch}
      error={!!errors.people}
      onChange={(event) => {
        setPeopleSearch(event.target.value);
        debouncedSetPeopleSearch(event.target.value);
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
          renderInput={renderInput}
          control={control}
          controlName="people"
          onChanger={(onChange: (value: { id: number } | null) => void) => (_event, value: any) => {
            if (value) {
              onChange(value.id);
            } else {
              onChange(null);
            }
          }}
        />
        <TextField
          label="Telefone"
          type="tel"
          error={!!errors.phone}
          {...register('phone', {required: 'O campo de telefone é obrigatório', minLength: {value: 10, message: 'Telefone inválido'}, maxLength: 11, pattern: {value: /^[0-9]+$/, message: 'Telefone inválido'}})}
        />
        <TextField
          label="E-Mail"
          type="email"
          error={!!errors.email}
          {...register('email', {required: 'O campo de email é obrigatório', pattern: {value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, message: 'Email inválido'}})}
        />
        <Button type="submit" variant="contained">Enviar</Button>
      </form>
    </>
  );
};
