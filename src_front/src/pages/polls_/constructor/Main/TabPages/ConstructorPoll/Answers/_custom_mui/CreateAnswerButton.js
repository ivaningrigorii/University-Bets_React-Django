import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh',
    marginTop: '6%',
    marginBottom:'6%',
  }
};
function CreateAnswerButton() {
   
  return (
    <div style={styles.center}>    
      <Button type='submin'  sx={{ my: 2,  display: 'block'}} color="secondary" variant="contained" >
        Добавить ответ
      </Button>
    </div>
  );
}
export default CreateAnswerButton;