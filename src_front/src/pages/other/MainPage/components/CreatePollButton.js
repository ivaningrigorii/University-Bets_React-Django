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
      <Button sx={{ my: 2, display: 'block', }}
        color="secondary" variant="contained" href={routes.polls.create} >
        Создать опрос
      </Button>
    </div>
  );
}
export default CreatePollButton;