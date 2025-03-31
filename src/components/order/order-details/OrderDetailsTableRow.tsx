import { useEffect, useState } from "react";
import { TOrderModel } from "@/models/orders/order";
import { OrderDetailModel, TOrderDetailModel } from "@/models/orders/order-detail";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingsStore } from "@/stores/dictionaries/settings";
import { useCurrenciesStore } from "@/stores/dictionaries/currencies";
import { useServicesStore } from "@/stores/dictionaries/services";
import { useServiceStatusesStore } from "@/stores/dictionaries/service-statuses";
import { useOrderDetailsStore } from "@/stores/orders/order-details";
import { useProductsStore } from "@/stores/products/products";
import { Autocomplete, TableRow, TableCell, TextField, Typography, Stack, styled, Button } from "@mui/material";
import ProductsSelector from "@/components/product/ProductsSelector";
import OrderDetailsTableRowActions from "./OrderDetailsTableRowActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 1,
  borderBottomStyle: "solid",
  borderColor: theme.palette.divider,
  overflow: "hidden",
  padding: 5,
  minWidth: 75,
}));

export default function OrderDetailsTableRow({
  orderId,
  serviceId,
  item,
  isLoading = false,
}: {
  orderId: TOrderModel["id"];
  serviceId: number;
  item?: TOrderDetailModel | null;
  isLoading?: boolean;
}) {
  const { control, formState, watch, setValue } = useForm<TOrderDetailModel>({
    mode: "onBlur",
    defaultValues: {
      id: item?.id,
      saleOrder: { id: orderId },
      description: item?.description ?? "",
      productName: item != null ? (item as any)["product.tNumber"] : "",
      product: {
        id: item?.product?.id ?? 0,
        name: item != null ? (item as any)["product.name"] ?? "" : "",
        pSurname: item != null ? (item as any)["product.pSurname"] ?? "" : "",
        service: { id: serviceId },
      },
      listPriceCur: item?.listPriceCur ?? null,
      listPrice: Number(item?.unitPrice) * Number(item?.qty) || 0,
      unitPrice: Number(item?.unitPrice) || 0,
      qty: item?.qty != null ? Math.ceil(item.qty) : 0,
      status: item?.status ?? null,
    },
    resolver: zodResolver(OrderDetailModel),
  });

  const productId = watch("product.id");
  const productName = watch("product.name");
  const productPSurname = watch("product.pSurname");
  const orderDetailId = watch("id");
  const orderDetailListPriceCur = watch("listPriceCur");
  const orderDetailDescription = watch("description");
  const orderDetailListPrice = watch("listPrice");
  const orderDetailUnitPrice = watch("unitPrice");
  const orderDetailQty = watch("qty");
  const orderDetailStatus = watch("status");

  const [productInputValue, setProductInputValue] = useState("");

  const settings = useSettingsStore((state) => state.getItems());
  const services = useServicesStore((state) => state.getItems({ pageSize: 0, sortBy: ["id"] }));
  const serviceStatuses = useServiceStatusesStore((state) => state.getItems({ translate: true }));
  const currencies = useCurrenciesStore((state) =>
    state.getItems({
      criteria: [{ fieldName: "isBase", operator: "=", value: true }],
    })
  );

  const orderDetailsStore = useOrderDetailsStore((state) => state);
  const productsStore = useProductsStore((state) => state);

  const getServiceBreadcrumbs = (id: number) => {
    let result = "";

    if (services == null) return result;

    let parent: number | undefined = id;

    while (parent != null) {
      const finded = services.find((f) => f?.id === parent);
      parent = finded?.parent?.id;
      result = (parent != null ? " -> " : "") + (finded?.["$t:name"] ?? finded?.name ?? "") + result;
    }

    return result;
  };

  const handleFindProduct = (id?: number) => {
    productsStore.clearStore();

    if (id != null) {
      productsStore.getItems({
        criteria: [
          {
            operator: "and",
            criteria: [
              { fieldName: "id", operator: "=", value: id },
              {
                fieldName: "service.id",
                operator: "=",
                value: serviceId ?? 0,
              },
            ],
          },
        ],
      });
    }
  };

  const handleSaveOrderDetail = async () => {
    const df = formState.dirtyFields;

    if (
      df.product?.id ||
      df.product?.name ||
      df.product?.pSurname ||
      df.listPriceCur ||
      df.description ||
      df.listPrice ||
      df.unitPrice ||
      df.qty ||
      df.status
    ) {
      const result = await orderDetailsStore.saveItem({
        id: orderDetailId,
        saleOrder: { id: orderId },
        description: orderDetailDescription,
        productName: `${productId}`,
        product: {
          id: productId,
          name: productName,
          pSurname: productPSurname,
          service: { id: serviceId },
        },
        listPriceCur: orderDetailListPriceCur,
        listPrice: orderDetailListPrice,
        unitPrice: orderDetailUnitPrice,
        qty: orderDetailQty,
        status: orderDetailStatus,
      });
    }
  };

  const handleProductChange = (
    product: TOrderDetailModel["product"],
    field: ControllerRenderProps<TOrderDetailModel, "product.id">
  ) => {
    setValue("product.name", product.name);
    setValue("product.pSurname", product.pSurname);
    setValue("product.tNumber", product.tNumber);
    setValue("product.resNumber", product.resNumber);
    setValue("product.route", product.route);
    setValue("listPriceCur", product.unitPriceCur);
    setValue("listPrice", (product.unitPrice ?? 1) * 1);
    setValue("unitPrice", product.unitPrice);
    setValue("qty", 1);
    field.onChange(product?.id ?? null);
  };

  const handleSelectedProducts = (ids: number[]) => {
    ids.map((id, i) => {
      const orderDetail: TOrderDetailModel = {
        productName: `${id}`,
        saleOrder: { id: orderId },
        product: { id, service: { id: serviceId } },
        listPriceCur: settings?.at(0)?.defaultCurrencySaleOrderLine,
        status: settings?.at(0)?.defaultStatusSaleOrderLine,
      };

      if (i === 0) orderDetail.id = orderDetailId;

      orderDetailsStore.saveItem(orderDetail);
    });
  };

  useEffect(() => {
    if (productInputValue) {
      productsStore.getItems({
        criteria: [
          {
            operator: "and",
            criteria: [
              { fieldName: "tNumber", operator: "=", value: productInputValue },
              {
                fieldName: "service.id",
                operator: "=",
                value: serviceId,
              },
            ],
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInputValue]);

  return (
    <TableRow key={item?.id}>
      <StyledTableCell sx={{ width: 200 }}>
        {serviceId === settings?.at(0)?.serviceForProductSelector?.id && (
          <Stack direction="row" alignItems="center">
            <Controller
              name="product.id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  size="small"
                  options={productsStore.items ?? []}
                  filterOptions={(options) => options}
                  getOptionLabel={(option) =>
                    option.tNumber ?? (item != null ? (item as any)["product.tNumber"] ?? "" : "")
                  }
                  isOptionEqualToValue={(option, value) => option.id === value}
                  noOptionsText="Нет данных"
                  loadingText="Загрузка..."
                  loading={productsStore.loading}
                  disabled={isLoading}
                  onInputChange={(e, value) => setProductInputValue(value)}
                  onChange={(e, v) => handleProductChange(v, field)}
                  onBlur={() => {
                    field.onBlur();
                    handleSaveOrderDetail();
                  }}
                  value={field.value as any}
                  onOpen={() => handleFindProduct(field.value)}
                  renderInput={(params) => <TextField {...params} variant="standard" placeholder="Авиа" />}
                  sx={{ width: "100%" }}
                />
              )}
            />
            <ProductsSelector serviceId={serviceId} isLoading={isLoading} onSubmit={handleSelectedProducts} />
          </Stack>
        )}
        {serviceId !== settings?.at(0)?.serviceForProductSelector?.id && (
          <Button color="secondary" disabled={isLoading} sx={{ minWidth: 50, textAlign: "left" }}>
            {getServiceBreadcrumbs(serviceId)}
          </Button>
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ width: 150 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Controller
            name="product.name"
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                size="small"
                placeholder="Имя"
                onBlur={() => {
                  field.onBlur();
                  handleSaveOrderDetail();
                }}
              />
            )}
          />
          <Controller
            name="product.pSurname"
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                size="small"
                placeholder="Фамилия"
                onBlur={() => {
                  field.onBlur();
                  handleSaveOrderDetail();
                }}
              />
            )}
          />
        </Stack>
      </StyledTableCell>
      <StyledTableCell>
        <Stack direction="row" alignItems="center" gap={1}>
          {(item as any)?.["product.resNumber"] != null && (
            <Typography>
              <b>Бронь:</b> {(item as any)["product.resNumber"]}
            </Typography>
          )}
          {(item as any)?.["product.route"] != null && (
            <Typography>
              <b>Маршрут:</b> {(item as any)["product.route"]}
            </Typography>
          )}
        </Stack>
        <Controller
          name="description"
          control={control}
          disabled={isLoading}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              size="small"
              multiline
              placeholder="Описание"
              onBlur={() => {
                field.onBlur();
                handleSaveOrderDetail();
              }}
              sx={{ width: "100%" }}
            />
          )}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 80 }}>
        <Controller
          name="listPriceCur"
          control={control}
          disabled={isLoading}
          render={({ field }) => (
            <Autocomplete
              size="small"
              options={currencies ?? []}
              filterOptions={(options) => options}
              getOptionLabel={(option) => `${option?.["$t:name"]}`}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              noOptionsText="Нет данных"
              disabled={isLoading}
              componentsProps={{
                paper: {
                  sx: {
                    ".MuiAutocomplete-option": {
                      display: "block !important",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    },
                  },
                },
              }}
              onChange={(e, v) => field.onChange(v ?? null)}
              onBlur={() => {
                field.onBlur();
                handleSaveOrderDetail();
              }}
              value={field.value}
              renderInput={(params) => <TextField {...params} variant="standard" placeholder="Валюта" />}
            />
          )}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 75 }}>
        <Controller
          name="unitPrice"
          control={control}
          disabled={isLoading}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              size="small"
              type="number"
              onChange={(e) => {
                field.onChange(e);
                const value = Number(e.target.value);
                if (value != null && orderDetailQty != null) {
                  setValue("listPrice", value * orderDetailQty);
                }
              }}
              onBlur={() => {
                field.onBlur();
                handleSaveOrderDetail();
              }}
            />
          )}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 75 }}>
        <Controller
          name="qty"
          control={control}
          disabled={isLoading}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              size="small"
              type="number"
              onChange={(e) => {
                field.onChange(e);
                const value = Number(e.target.value);
                if (value != null && orderDetailUnitPrice != null) {
                  setValue("listPrice", value * orderDetailUnitPrice);
                }
              }}
              onBlur={() => {
                field.onBlur();
                handleSaveOrderDetail();
              }}
            />
          )}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 75 }}>
        <Typography>{orderDetailListPrice}</Typography>
      </StyledTableCell>
      <StyledTableCell sx={{ width: 100 }}>
        <Controller
          name="status"
          control={control}
          disabled={isLoading}
          render={({ field }) => (
            <Autocomplete
              size="small"
              options={serviceStatuses ?? []}
              getOptionLabel={(option) => `${option?.["title_kg"] || option?.["title_ru"] || option?.title}`}
              noOptionsText="Нет данных"
              disabled={isLoading}
              componentsProps={{
                paper: {
                  sx: {
                    ".MuiAutocomplete-option": {
                      display: "block !important",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    },
                  },
                },
              }}
              onChange={(e, v) => field.onChange(v?.value ?? null)}
              onBlur={() => {
                field.onBlur();
                handleSaveOrderDetail();
              }}
              value={serviceStatuses?.find((item) => item?.value === field.value) ?? null}
              renderInput={(params) => <TextField {...params} variant="standard" placeholder="Статус" />}
            />
          )}
        />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ width: 40, minWidth: 40 }}>
        {item?.id && <OrderDetailsTableRowActions id={item.id} disabled={isLoading} />}
      </StyledTableCell>
    </TableRow>
  );
}
