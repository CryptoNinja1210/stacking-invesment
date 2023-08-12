import react from 'react';
import './index.css';

function YellowButton(props) {
  return (
    
    <button onClick = {props.onClick } className='text-xs md:text-base text-black mx-1 rounded-lg text-base px-6 py-1.5 bg-yellow-400 hover:bg-yellow-500' >{props.children}</button>
 
  );
}
function WhiteButton(props) {
    return (
      
      <button onClick = {props.onClick } className='text-xs md:text-base text-black mx-1 rounded-lg text-base px-6 py-1.5 bg-white hover:bg-gray-200' >{props.children}</button>
    );
  }
function InActiveButton(props) {
    return (
      
      <button onClick = {props.onClick } className='text-xs md:text-base text-gray-600 mx-1 rounded-lg text-base px-6 py-1.5 bg-gray-400 cursor-default' >{props.children}</button>
    );
  }
  
export  {WhiteButton, YellowButton, InActiveButton};
