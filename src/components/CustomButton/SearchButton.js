import SearchIcon from 'assets/SearchIcon';

function SearchButton(props) {
  const { children, className, color, ...other } = props;
  return (<button style={{ color: color }} className={`btn-custom btn-search ${className}`} {...other}>
    <SearchIcon color={props.disabled ? '#bfbfc1' : color} size={15} />{children}
  </button>);
}

export default SearchButton;