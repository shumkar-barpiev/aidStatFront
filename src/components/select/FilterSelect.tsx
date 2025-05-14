import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export interface Option {
  id: number;
  name: string;
  projectCount: number;
}

interface Props {
  name?: string;
  options: Option[];
  value: string;
  onChange: (id: number, isDuo?: boolean) => void;
  labelName: string;
  isAll?: boolean;
  isDuo?: boolean;
}

const FilterSelect: React.FC<Props> = ({ name, options, value, onChange, labelName, isAll = true, isDuo = false }) => {
  // const [selected, setSelected] = useState<string>(value);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: SelectChangeEvent) => {
    // setSelected(event.target.value);
    const id = Number(event.target.value);
    onChange(id, isDuo);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`select-label-${labelName}`}>{labelName}</InputLabel>
      <Select
        name={name}
        labelId={`select-label-${labelName}`}
        value={value}
        onChange={handleChange}
        label={labelName}
        renderValue={(selectedValue) => {
          const selectedOption = options.find((opt) => opt.id === Number(selectedValue));
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: { xs: "300px" },
              }}
            >
              {selectedOption?.name ?? `Все ${labelName.toLowerCase() + "ы"}`}
            </Box>
          );
        }}
        // renderValue={(selectedValue) => {
        //   // Находим выбранный элемент
        //   const selectedOption = options.find((opt) => opt.id === Number(selectedValue));
        //   // Если isAll = false, то не показывать "Все"
        //   if (!selectedOption && isAll) {
        //     return (
        //       <Box
        //         sx={{
        //           display: "flex",
        //           alignItems: "center",
        //           overflow: "hidden",
        //           textOverflow: "ellipsis",
        //           whiteSpace: "nowrap",
        //           maxWidth: { xs: "300px" },
        //         }}
        //       >
        //         {`Все ${labelName.toLowerCase() + "ы"}`}
        //       </Box>
        //     );
        //   }
        //   // Если есть выбранная опция, показываем её
        //   return (
        //     <Box
        //       sx={{
        //         display: "flex",
        //         alignItems: "center",
        //         overflow: "hidden",
        //         textOverflow: "ellipsis",
        //         whiteSpace: "nowrap",
        //         maxWidth: { xs: "300px" },
        //       }}
        //     >
        //       {selectedOption?.name ?? `Все ${labelName.toLowerCase() + "ы"}`}
        //     </Box>
        //   );
        // }}
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
            <MenuItem key={option.id} value={option.id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  mr: 0.5,
                }}
              >
                {option.name}
              </Typography>
              <Typography>({option.projectCount})</Typography>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
