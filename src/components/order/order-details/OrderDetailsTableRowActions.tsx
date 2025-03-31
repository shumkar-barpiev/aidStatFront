import { ChangeEvent, MouseEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useOrderDetailsStore } from "@/stores/orders/order-details";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function OrderDetailsTableRowActions({ id, disabled }: { id: number; disabled?: boolean }) {
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const [deletionConfirmationOpen, setDeletionConfirmationOpen] = useState(false);

  const orderDetailsStore = useOrderDetailsStore((state) => state);

  const handleDeletionConfirmationOpen = () => {
    setDeletionConfirmationOpen(true);
  };

  const handleDeletionConfirmationClose = () => {
    setDeletionConfirmationOpen(false);
  };

  const handleActionsMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setActionsEl(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsEl(null);
  };

  const handleMenuUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    // onUpload(e.target.files);
    handleActionsMenuClose();
  };

  const handleMenuDeleteClick = () => {
    handleDeletionConfirmationOpen();
  };

  const handleDeleteAction = () => {
    orderDetailsStore.deleteItem({ id });
    handleDeletionConfirmationClose();
    handleActionsMenuClose();
  };

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <IconButton disabled={disabled} onClick={handleActionsMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={actionsEl}
        open={Boolean(actionsEl)}
        onClose={handleActionsMenuClose}
      >
        <MenuItem component="label">
          <VisuallyHiddenInput type="file" onChange={handleMenuUploadClick} />
          <ListItemIcon>
            <FileUploadOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Загрузить</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuDeleteClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={deletionConfirmationOpen}
        onClose={handleDeletionConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Удаление записи</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Вы точно хотите удалить данную запись?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDeletionConfirmationClose}>
            Отмена
          </Button>
          <Button color="error" onClick={handleDeleteAction} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
