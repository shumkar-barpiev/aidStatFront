"use client";

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  styled,
  Pagination,
  Checkbox,
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductsStore } from "@/stores/products/products";
import { TCriteriaList, TModelFilters } from "@/types/model";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  padding: 5,
}));

let timer: ReturnType<typeof setTimeout> | null;

const initialFilters: (serviceId: number) => TModelFilters = (serviceId) => ({
  page: 1,
  pageSize: 10,
  fields: ["name", "pSurname", "route", "tNumber", "resNumber", "pnrNumber", "service"],
  criteria: [
    {
      operator: "and",
      criteria: [
        {
          fieldName: "service.id",
          operator: "=",
          value: serviceId,
        },
      ],
    },
  ],
});

export default function ProductsTable({
  serviceId,
  onSelect,
}: {
  serviceId: number;
  onSelect?: (ids: number[]) => void;
}) {
  const [pageTotal, setPageTotal] = useState(1);
  const [filters, setFilters] = useState<TModelFilters>({
    ...initialFilters(serviceId),
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const productsStore = useProductsStore((state) => state);

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSelectItems = (checked: boolean, id?: number) => {
    if (id != null) {
      if (checked) setSelectedIds((prev) => [...prev, id]);
      else setSelectedIds((prev) => prev.filter((fid) => fid != id));
    } else {
      const ids = productsStore.items?.map((item) => item.id) ?? [];
      if (checked) setSelectedIds(ids as number[]);
      else setSelectedIds([]);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const baseFilters = initialFilters(serviceId)?.criteria ?? [];

      if (e.target.value) {
        (baseFilters.at(0) as TCriteriaList)?.criteria.push({
          operator: "or",
          criteria: [
            { fieldName: "name", operator: "like", value: `%${e.target.value}%` },
            { fieldName: "pSurname", operator: "like", value: `%${e.target.value}%` },
            { fieldName: "route", operator: "like", value: `%${e.target.value}%` },
            { fieldName: "tNumber", operator: "like", value: `%${e.target.value}%` },
            { fieldName: "pnrNumber", operator: "like", value: `%${e.target.value}%` },
          ],
        });
      }

      setFilters((prev) => ({
        ...prev,
        page: 1,
        criteria: baseFilters,
      }));

      timer = null;
    }, 500);
  };

  useEffect(() => {
    productsStore.getItems(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const pageTotal =
      productsStore.total != null && filters?.pageSize != null ? Math.ceil(productsStore.total / filters?.pageSize) : 1;
    setPageTotal(pageTotal);
  }, [productsStore.total, filters?.pageSize]);

  useEffect(() => {
    if (onSelect != null) onSelect(selectedIds);
  }, [selectedIds, onSelect]);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", gap: 1, p: 1 }}>
      <TextField
        size="small"
        placeholder="Поиск"
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Checkbox
                  disabled={productsStore.loading || productsStore.items == null}
                  checked={selectedIds.length === productsStore.items?.length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < (productsStore.items?.length ?? 0)}
                  onChange={(_, checked) => handleSelectItems(checked)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">№</StyledTableCell>
              <StyledTableCell align="center">ФИО</StyledTableCell>
              <StyledTableCell align="center">Маршрут</StyledTableCell>
              <StyledTableCell align="center">ПНР номер</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsStore.items != null &&
              productsStore.items.map((item) => (
                <TableRow key={item.id}>
                  <StyledTableCell align="center">
                    <Checkbox
                      disabled={productsStore.loading}
                      checked={selectedIds.find((fid) => fid === item.id) != null}
                      onChange={(_, checked) => handleSelectItems(checked, item.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{item.tNumber}</StyledTableCell>
                  <StyledTableCell>
                    {item.pSurname} {item.name}
                  </StyledTableCell>
                  <StyledTableCell>{item.route}</StyledTableCell>
                  <StyledTableCell>{item.pnrNumber}</StyledTableCell>
                </TableRow>
              ))}
            {productsStore.items == null && (
              <TableRow>
                <StyledTableCell align="center" colSpan={5}>
                  {productsStore.loading && <CircularProgress />}
                  {!productsStore.loading && <Typography variant="h6">Нет данных</Typography>}
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        page={filters?.page}
        count={pageTotal}
        siblingCount={1}
        boundaryCount={2}
        onChange={handlePageChange}
        disabled={productsStore.loading}
      />
    </Card>
  );
}
