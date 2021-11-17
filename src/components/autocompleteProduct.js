

import { Autocomplete, TextField } from '@mui/material';
import useListItem from '../hooks/useListItem';

export default function MyAutocomplete({ onChange }) {
  const { priceList } = useListItem();
  return (
    <>
      {priceList.length > 0 &&
        <Autocomplete
          id="select-product"
          getOptionLabel={(option) => option.name}
          options={priceList}
          renderInput={(params) => <TextField {...params} label="Producto" variant="standard" fullWidth />}
          //onChange={(e, value) => value !== null ? fnSetState(value) : fnSetState("")}
          onChange={onChange}
        />}
    </>
  );
}
