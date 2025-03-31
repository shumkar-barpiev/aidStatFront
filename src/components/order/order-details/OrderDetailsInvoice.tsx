"use client";

import { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Popover,
  TextField,
} from "@mui/material";
import { useCurrenciesStore } from "@/stores/dictionaries/currencies";
import { useLanguagesStore } from "@/stores/dictionaries/languages";
import { debounce } from "@/utils/utils";
import { CurrencyModel } from "@/models/dictionaries/currency";
import { useOrderDetailsInvoiceStore } from "@/stores/orders/order-details-invoice";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Infer } from "next/dist/compiled/superstruct";
import { LanguageModel } from "@/models/dictionaries/language";

const schema = z.object({
  currency: CurrencyModel,
  language: LanguageModel,
});

type FormScheme = Infer<typeof schema>;

const defaultOptions = [
  { label: "ОсОО 1", value: "osoo1" },
  { label: "ОсОО 2", value: "osoo2" },
  { label: "ОсОО 3", value: "osoo3" },
  { label: "ОсОО 4", value: "osoo4" },
  { label: "ОсОО 5", value: "osoo5" },
];

export default function OrderDetailsInvoice() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "order-details-invoice-popover" : undefined;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ py: 0.4 }}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        Выставить счет
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <PopoverContent />
      </Popover>
    </>
  );
}

function PopoverContent() {
  const { control, handleSubmit } = useForm<FormScheme>({
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const useCurrencyStore = useCurrenciesStore((state) => state);
  const useLanguageStore = useLanguagesStore((state) => state);
  const useInvoiceStore = useOrderDetailsInvoiceStore((state) => state);

  const [currency, setCurrency] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const debouncedSetCurrency = debounce(setCurrency, 500);
  const debouncedSetLanguage = debounce(setLanguage, 500);

  useEffect(() => {
    useCurrencyStore.fetchItems({
      criteria: [
        { fieldName: "name", operator: "like", value: currency },
        { fieldName: "code", operator: "like", value: currency },
      ],
    });
  }, [currency]);

  useEffect(() => {
    useLanguageStore.fetchItems({
      criteria: [
        { fieldName: "name", operator: "like", value: language },
        { fieldName: "code", operator: "like", value: language },
      ],
    });
  }, [language]);

  const downloadPdf = async (data: FormScheme) => {
    if (useInvoiceStore.loading) return;

    useInvoiceStore
      .fetchInvoiceId({
        saleOrderId: 2,
        currencyId: 148,
        languageCode: data.language.code,
      })
      .then((id) => {
        if (!id) {
          /// TODO: show error message
          return;
        }

        const link = document.createElement("a");
        link.download = "document.pdf";
        link.href = `https://concept.sanarip.org/concept/ws/dms/download/${id}`;
        link.click();
      });
  };

  return (
    <form onSubmit={handleSubmit(downloadPdf)}>
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1.5,
        }}
      >
        <Controller
          name="currency"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Autocomplete
              size="small"
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              filterOptions={(options) => options}
              getOptionLabel={(option) => `${option.code} - ${option["$t:name"] ?? option.name}`}
              noOptionsText="Нет данных"
              loadingText="Загрузка..."
              options={useCurrencyStore.items ?? []}
              loading={useCurrencyStore.loading}
              onInputChange={(e, value) => debouncedSetCurrency(value)}
              renderInput={(params) => <TextField {...params} label="Валюта" value={currency} />}
            />
          )}
        />

        <Controller
          name="language"
          control={control}
          render={({ field: { ...field } }) => (
            <Autocomplete
              size="small"
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              filterOptions={(options) => options}
              getOptionLabel={(option) => `${option.code} - ${option["$t:name"] ?? option.name}`}
              noOptionsText="Нет данных"
              loadingText="Загрузка..."
              options={useLanguageStore.items ?? []}
              loading={useLanguageStore.loading}
              onInputChange={(e, value) => debouncedSetLanguage(value)}
              renderInput={(params) => <TextField {...params} label="Язык" value={language} />}
            />
          )}
        />

        <Autocomplete
          size="small"
          options={defaultOptions}
          renderInput={(params) => <TextField {...params} label="ОсОО" />}
        />

        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Цифровая подпись" />

        <Button
          size="small"
          variant="contained"
          type="submit"
          endIcon={
            useInvoiceStore.loading ? (
              <Box sx={{ height: 20, ml: 0.4, position: "relative", display: "flex", alignItems: "center" }}>
                <CircularProgress size={15} sx={{ color: "white" }} />
              </Box>
            ) : (
              <DownloadIcon />
            )
          }
        >
          Скачать PDF
        </Button>
      </Box>
    </form>
  );
}
