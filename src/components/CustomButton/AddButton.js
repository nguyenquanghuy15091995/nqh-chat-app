import AddIcon from 'assets/AddIcon';

function AddButton(props) {
  const { children, className, fullWidth, color, ...other } = props;
  return (<button style={{color:color, width: fullWidth ? '100%' : ''}} className={`btn-custom btn-add ${className}`} {...other}>
    <span style={{ marginRight: 10, marginBottom: 5 }}><AddIcon color={color} size={15} /></span>{children}
  </button>);
}

export default AddButton;