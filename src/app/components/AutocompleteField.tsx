import * as React from 'react';
import {ReactElement, SyntheticEvent} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller, useFormContext} from 'react-hook-form';

interface Props {
  isOptionEqualToValue: (option: object, value: object) => boolean;
  getOptionLabel: (option: object) => string;
  options: object[];
  renderInput: (params: object) => ReactElement;
  controlName: 'people' | 'phone' | 'email';
  onChanger: (onChange: (value: { id: number } | null) => void) => (event: SyntheticEvent<Element, Event>, value: object | null) => void;
}

const AutocompleteField = (props: Props) => {
  const methods = useFormContext();
  const {control} = methods;
  const [open, setOpen] = React.useState(false);
  const {controlName, onChanger, ...restProps} = props;

  return (
    <Controller
      name={controlName}
      control={control}
      rules={{required: 'O campo de pessoa é obrigatório'}}
      render={({field: {onChange}}) => (
        <Autocomplete
          onChange={onChanger(onChange)}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          {...restProps}
        />
      )}
    />
  );
};

export default AutocompleteField;
