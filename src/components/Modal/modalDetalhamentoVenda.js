import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  

export default function DetalhamentoVenda(props) {
  function noOnChange() {
    return "noOnChange";
  }
  function noOpen() {
    return "noOpen";
  }
//   const [open, setOpen] = useState(false);
  const open = props.open ? props.open : false;
  const handleClose = props.handleClose ? props.handleClose : noOnChange;
  const handleOpen = () => props.openF ? props.openF : noOpen;
  const idVenda = props.idVenda ? props.idVenda : "-1";


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          <h2>{idVenda}</h2>
        </Typography>
      </Box>
    </Modal>
  );
}
