import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export interface Option {
  id: number;
  name: string;
  projectCount: number;
}

interface Props {
  name?: string;
  options: Option[];
  value: string;
  onChange: (id: number) => void;
  labelName: string;
  isAll?: boolean;
}

const FilterSelect: React.FC<Props> = ({ name, options, value, onChange, labelName, isAll=true }) => {
  const [selected, setSelected] = useState<string>(value);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    const id = Number(event.target.value);
    onChange(id);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`select-label-${labelName}`}>{labelName}</InputLabel>
      <Select
        name={name}
        labelId={`select-label-${labelName}`}
        value={selected}
        onChange={handleChange}
        label={labelName}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              zIndex: 1302,
            },
          },
          disablePortal: isSmallScreen,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        {isAll && <MenuItem value={-1}>Все {labelName.toLowerCase() + "ы"}</MenuItem>}
        {options
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((option) => (
            <MenuItem key={option.id} value={option.id}>
              ({option.projectCount}) - {option.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
