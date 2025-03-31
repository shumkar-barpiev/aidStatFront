"use client";

import { useEffect, useState } from "react";
import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  Typography,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import OrderDetailsInvoice from "@/components/order/order-details/OrderDetailsInvoice";
import TreeMenu from "@/components/other/TreeMenu";
import { TOrderModel } from "@/models/orders/order";
import { TServiceModel } from "@/models/dictionaries/service";
import { useOrderStore } from "@/stores/orders/orders";
import { useOrderDetailsStore } from "@/stores/orders/order-details";
import { useServicesStore } from "@/stores/dictionaries/services";
import { useSettingsStore } from "@/stores/dictionaries/settings";

export enum EOrderDetailsFilters {
  search = "search",
}

export default function OrderDetailsActions({
  totalOrderDetails,
  orderId,
  onFilter,
}: {
  totalOrderDetails?: number | null;
  orderId: TOrderModel["id"];
  onFilter?: (type: EOrderDetailsFilters, value?: string | number) => void;
}) {
  const [activeTab, setActiveTab] = useState("orderDetails");
  const [tabsEl, setTabsEl] = useState<null | HTMLElement>(null);
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const [services, setServices] = useState<null | TServiceModel[]>(null);

  const settings = useSettingsStore((state) => state.getItems());
  const serviceStore = useServicesStore((state) => state);
  const orderStore = useOrderStore((state) => state);
  const orderDetailsStore = useOrderDetailsStore((state) => state);

  const handleFilter = (type: EOrderDetailsFilters, value?: string | number) => {
    if (onFilter != null) onFilter(type, value);
  };

  const handleAction = (id?: number) => {
    orderDetailsStore.saveItem({
      productName: "new",
      saleOrder: { id: orderId },
      product: { service: { id } },
      listPriceCur: settings?.at(0)?.defaultCurrencySaleOrderLine,
      status: settings?.at(0)?.defaultStatusSaleOrderLine,
    });
  };

  useEffect(() => {
    if (orderId || (orderId && orderDetailsStore.dirty)) orderStore.fetchSum(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, orderDetailsStore.dirty]);

  useEffect(() => {
    setServices(serviceStore.getItems({ pageSize: 0, sortBy: ["id"] }));
  }, [serviceStore]);

  return (
    <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center" justifyContent="space-between" width="100%">
      <ButtonGroup variant="outlined" color="secondary" size="small">
        <Button
          startIcon={<ListIcon />}
          variant={activeTab === "orderDetails" ? "contained" : "outlined"}
          color={activeTab === "orderDetails" ? "primary" : "secondary"}
        >
          Заказы ({totalOrderDetails ?? 0})
        </Button>
        <Button
          startIcon={<ListAltIcon />}
          variant={activeTab === "allOrderDetails" ? "contained" : "outlined"}
          color={activeTab === "allOrderDetails" ? "primary" : "secondary"}
        >
          Все заказы (13)
        </Button>

        <Menu
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorEl={tabsEl}
          open={Boolean(tabsEl)}
          onClose={() => setTabsEl(null)}
        >
          <MenuItem>
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Документ</ListItemText>
          </MenuItem>
        </Menu>
        <Button
          endIcon={<MoreHorizIcon />}
          sx={{ "& .MuiButton-endIcon": { m: 0 } }}
          onClick={(e) => setTabsEl(e.currentTarget)}
        ></Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined" color="secondary" size="small">
        <TreeMenu buttonText="Добавить услугу" items={services} onSelect={(id) => handleAction(id)} />
      </ButtonGroup>

      <TextField
        variant="outlined"
        placeholder="Поиск"
        size="small"
        onChange={(e) => handleFilter(EOrderDetailsFilters.search, e.target.value)}
        InputProps={{
          sx: { pl: 1, ".MuiInputBase-input": { py: 0.5 } },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 200 }}
      />

      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
        <OrderDetailsInvoice />
        <Typography variant="h6">{orderStore.sum ?? 0} Сом</Typography>
      </Stack>
    </Stack>
  );
}
