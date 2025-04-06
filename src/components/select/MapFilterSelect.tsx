import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  labelName: string;
}

const MapFilterSelect: React.FC<Props> = ({ options, value, onChange, labelName }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`select-label-${labelName}`}>{labelName}</InputLabel>
      <Select
        labelId={`select-label-${labelName}`}
        value={value} // Получаем значение от родителя
        onChange={onChange}
        label={labelName}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MapFilterSelect;
