import Button from '@material-ui/core/Button';
import React from 'react';
import routes from '../../../../routes';

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5vh",
    marginTop: "5vh",
  },
};
function CreatePollButton() {
  return (
    <div style={styles.center}>
      <Button
        sx={{ my: 2, display: "block" }}
        color="secondary"
        variant="contained"
        href={routes.bets.list_bets}
      >
        Сделать ставку
      </Button>
    </div>
  );
}
export default CreatePollButton;
