import React from 'react';
import './ColorButton.css';

function ColorButton() {
  const [color, setColor] = React.useState('red');

  const nextColor = color === 'red' ? 'blue' : 'red';

  const changeColor = () => {
    setColor(nextColor);
  };
  return (
    <div>
      <button className={color} onClick={changeColor}>
        Change to {nextColor}
      </button>
    </div>
  );
}

export default ColorButton;
