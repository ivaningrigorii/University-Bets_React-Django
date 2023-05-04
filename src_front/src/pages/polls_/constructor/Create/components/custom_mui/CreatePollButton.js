import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
};
function CreatePollButton() {
   
  return (
    <div style={styles.center}>    
      <Button type='submit'  color="secondary" >
        Создать опрос
      </Button>
    </div>
  );
}
export default CreatePollButton;