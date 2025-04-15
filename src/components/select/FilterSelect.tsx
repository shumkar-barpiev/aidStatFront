import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface Option {
  id: number;
  name: string;
}

interface Props {
  name?: string;
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  labelName: string;
}

const FilterSelect: React.FC<Props> = ({ name, options, value, onChange, labelName }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`select-label-${labelName}`}>{labelName}</InputLabel>
      <Select
        name={name}
        labelId={`select-label-${labelName}`}
        value={value}
        onChange={onChange}
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
        <MenuItem value="all">Все {labelName.toLowerCase() + "ы"}</MenuItem>
        {options
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
