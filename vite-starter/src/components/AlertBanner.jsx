import Alert from '@mui/material/Alert';

const AlertBanner = (props) => {
  const { label, children, ...rest } = props;
  return (
    <Alert aria-label={label} {...rest}>
      {label || children}
    </Alert>
  );
};
export default AlertBanner;
