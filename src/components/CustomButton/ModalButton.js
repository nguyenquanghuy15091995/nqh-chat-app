function ModalButton(props) {
  const { children, fullWidth, backgroundColor, className, color, ...other } = props;
  return (
    <button style={{ backgroundColor: backgroundColor, color: color, width: fullWidth ? '100%' : '' }} className={`btn-custom btn-modal ${className}`} {...other}>
      {children}
    </button>
  );
}

export default ModalButton;