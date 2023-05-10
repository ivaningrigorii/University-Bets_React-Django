import React from 'react';
import Button from '@material-ui/core/Button';
import routes from '../../../../routes';

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh',
    marginBottom: '1%'
  }
};
function CreatePollButton() {

  return (
    <div style={styles.center}>
      <Button sx={{ my: 2, display: 'block', mt: "10px", }}
        color="secondary" variant="contained" href="#" >
        Сделать ставку
      </Button>
    </div>
  );
}
export default CreatePollButton;