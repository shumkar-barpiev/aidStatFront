import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductsTable from "@/components/product/ProductsTable";

export default function ProductsSelector({
  serviceId,
  isLoading,
  onSubmit,
}: {
  serviceId: number;
  isLoading?: boolean;
  onSubmit?: (ids: number[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (onSubmit) onSubmit(selectedItems);
  };

  const handleSelectedItems = (ids: number[]) => {
    setSelectedItems(ids);
  };

  useEffect(() => {
    if (isLoading) setOpen(false);
  }, [isLoading]);

  return (
    <>
      <IconButton disabled={isLoading} onClick={handleClickOpen}>
        <SearchIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 800 } }}>
        <DialogTitle>Выбрать билеты</DialogTitle>
        <DialogContent>
          <ProductsTable serviceId={serviceId} onSelect={handleSelectedItems} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
