import React, { useState } from 'react';
import {
  FormControl,
  FormGroup,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material';
import MouseOverPopover from '../../components/MouseOverPopover';

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <Box display="flex" gap={1}>
      <Typography> I agree to</Typography>
      <MouseOverPopover popover={<Typography p={1}>no ice cream</Typography>}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </MouseOverPopover>
    </Box>
  );

  return (
    <FormControl>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={tcChecked}
              onChange={(e) => setTcChecked(e.target.checked)}
              name="terms-and-conditions"
            />
          }
          label={checkboxLabel}
        />
      </FormGroup>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </FormControl>
  );
}
