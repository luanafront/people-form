import * as React from 'react';
import {ReactElement, SyntheticEvent} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {Control, Controller} from 'react-hook-form';
import {FormData} from '@/app/components/@types';

interface Props {
  isOptionEqualToValue: (option: object, value: object) => boolean;
  getOptionLabel: (option: object) => string;
  options: object[];
  renderInput: (params: object) => ReactElement;
  control: Control<FormData>;
  controlName: 'people' | 'phone' | 'email';
  onChanger: (onChange: (value: {id: number} | null) => void) => (event: SyntheticEvent<Element, Event>, value: object | null) => void;
}

const AutocompleteField = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const {controlName, control, onChanger, ...restProps} = props;

  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { onChange } }) => (
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
