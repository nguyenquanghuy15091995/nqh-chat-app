import SendIcon from 'assets/SendIcon';

function SendButton(props) {
  const { children, className, color, ...other } = props;
  return (<button style={{ color: color }} className={`btn-custom btn-send ${className}`} {...other}>
    <span style={{ marginRight: children ? 10 : 0 }}><SendIcon color={props.disabled ? '#bfbfc1' : color} size={40} /></span>{children}
  </button>);
}

export default SendButton;