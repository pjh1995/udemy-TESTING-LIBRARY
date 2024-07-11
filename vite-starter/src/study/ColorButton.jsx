import React from 'react';
import './ColorButton.css';
import { kebabToTitle } from './helper';

function ColorButton() {
  const [color, setColor] = React.useState('medium-violet-red');
  const [checked, setChecked] = React.useState(false);

  const nextColor = color === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const className = checked ? 'grey' : color;

  const changeColor = () => {
    setColor(nextColor);
  };

  const toggleCheckbox = (e) => {
    if (!e) return;
    setChecked(e.target.checked);
  };
  return (
    <div>
      <button className={className} onClick={changeColor} disabled={checked}>
        Change to {kebabToTitle(nextColor)}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        checked={checked}
        onChange={toggleCheckbox}
      />
      <label htmlFor="disable-button-checkbox">disable button</label>
    </div>
  );
}

export default ColorButton;
