import ButtonMaterial from '@mui/material/Button';
import propTypes from 'prop-types';

function Button({ nom, fonction }) {
  return (
    <ButtonMaterial variant="contained" onClick={fonction}>{nom}</ButtonMaterial>
  )
}

export default Button

Button.propTypes = {
  nom: propTypes.string.isRequired,
  fonction: propTypes.func.isRequired
}

