
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Reusable dialog shown after successful resume download
function DownloadSuccessDialog({ open, onClose, onBackHome }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ textAlign: "center" }}>
                <CheckCircleIcon
                    sx={{
                        fontSize: 65,
                        color: "#16a34a",
                    }}
                />

                <Typography variant="h5" fontWeight="bold">
                    Resume Downloaded!
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                >
                    Your resume has been successfully generated
                    and downloaded.
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    pb: 3,
                }}
            >
                <Button variant="contained" onClick={onBackHome}>
                    Back to Home
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DownloadSuccessDialog;
