import ButtonMaterial from '@mui/material/Button';
import propTypes from 'prop-types';

function Button({ name, fonction }) {
  return (
    <ButtonMaterial variant="contained" onClick={fonction}>{name}</ButtonMaterial>
  )
}

export default Button

Button.propTypes = {
  name: propTypes.string.isRequired,
  fonction: propTypes.func.isRequired
}

