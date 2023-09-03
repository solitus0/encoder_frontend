import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

interface InputWithButtonsProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  primaryLabel?: string; // Optional because of default values
  secondaryLabel?: string; // Optional because of default values
  isDisabled: boolean;
}

function InputWithButtons({
  label,
  value,
  onChange,
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel = "Save",
  secondaryLabel = "Clear",
  isDisabled,
}: InputWithButtonsProps) {
  return (
    <Grid container spacing={3} alignItems="flex-end">
      <Grid item xs>
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={onPrimaryClick}
          disabled={isDisabled}
        >
          {primaryLabel}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onSecondaryClick}
          style={{ marginLeft: "10px" }}
        >
          {secondaryLabel}
        </Button>
      </Grid>
    </Grid>
  );
}

export default InputWithButtons;
