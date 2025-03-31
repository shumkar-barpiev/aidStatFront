"use client";

import { ReactNode } from "react";
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
} from "@mui/material";
import { TOrderModel } from "@/models/orders/order";
import { TOrderDetailModel } from "@/models/orders/order-detail";
import { TServiceModel } from "@/models/dictionaries/service";
import OrderDetailsTableRow from "./OrderDetailsTableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  padding: 10,
}));

export default function OrderDetailsTable({
  orderId,
  items,
  isLoading = false,
}: {
  orderId: TOrderModel["id"];
  items?: TOrderDetailModel[] | null;
  isLoading?: boolean;
}) {
  const getRowByItemType = (item: TOrderDetailModel & { "product.service": TServiceModel }): ReactNode => {
    if (item["product.service"]?.id == null) return <></>;

    return (
      <OrderDetailsTableRow
        key={`${item.id}_${item.product.id}`}
        item={item}
        isLoading={isLoading}
        orderId={orderId}
        serviceId={item["product.service"].id}
      />
    );
  };

  return (
    <TableContainer sx={{ overflow: "inherit" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Услуга</StyledTableCell>
            <StyledTableCell align="center">ФИО</StyledTableCell>
            <StyledTableCell align="center">Описание</StyledTableCell>
            <StyledTableCell align="center">Валюта</StyledTableCell>
            <StyledTableCell align="center">Цена</StyledTableCell>
            <StyledTableCell align="center">Кол-во</StyledTableCell>
            <StyledTableCell align="center">Итого</StyledTableCell>
            <StyledTableCell align="center">Статус</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.map((item) => getRowByItemType(item as TOrderDetailModel & { "product.service": TServiceModel }))}
          {items == null && (
            <TableRow>
              <StyledTableCell align="center" colSpan={9}>
                {isLoading && <CircularProgress />}
                {!isLoading && <Typography variant="h6">Нет данных</Typography>}
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
