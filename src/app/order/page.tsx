import { Box } from "@mui/material";
import ActionCard from "@/components/order/cards/ActionCard";
import OrderDetails from "@/components/order/order-details/OrderDetails";

export default function Order() {
  return (
    <>
      <Box display="flex" flexDirection="column" gap={1} p={1}>
        <Box display="flex" gap={1}>
          <ActionCard />

          <Box component="section" sx={{ p: 1, border: "1px dashed grey" }}>
            This Box renders as an HTML section element.
          </Box>
        </Box>

        <OrderDetails orderId={2} />
      </Box>
    </>
  );
}
