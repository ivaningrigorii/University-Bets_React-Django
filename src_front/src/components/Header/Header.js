import React from 'react';
import  { Component } from 'react';
import AppMenu from './UI/AppMenu';

class  Header  extends  Component {
  render()
  {
return(
  <div className='header'>
  <AppMenu/>
  </div> 
);
  }
}
export default Header;

