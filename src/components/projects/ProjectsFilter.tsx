import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack, Box } from "@mui/material";

export default function ProjectsFilter() {
  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "4px" }}>
      <Stack spacing={3}>
        <Autocomplete
          multiple
          size="small"
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Секторы" placeholder="Секторы" />}
        />

        <Autocomplete
          multiple
          size="small"
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Партнеры" placeholder="Партнеры" />}
        />

        <Autocomplete
          multiple
          size="small"
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Охват" placeholder="Охват" />}
        />
      </Stack>
    </Box>
  );
}

const top100Films = [
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
];
