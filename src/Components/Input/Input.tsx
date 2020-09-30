import React, { useState } from 'react';
import './Input.css'

type Props = {
  onAddTask: (task: string) => void
}

function Input(props: Props) {

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (event: any) => {
    setInputValue(event.target.value);
  } 

  const onFocus = () => {
    setIsFocused(true);
  }

  const onBlur = () => {
    setIsFocused(false);
  }
  

  // inputRef = React.createRef();

  // onChange = event => {
  //   this.setState({
  //     inputValue: event.target.value,
  //   });
  // }

  const onSubmit = (event: any) => {
    event.preventDefault();
    props.onAddTask(inputValue);
    setInputValue('');
    // this.inputRef.current.focus();
  }
  
  return (
    <>
      <div className="app__input-wrapper input-wrapper">
        <form 
          className="input-wrapper__form"
          >
          <input 
            // ref={this.inputRef}
            type="text"
            placeholder="Add new task"
            className="input-wrapper__input"
            value={inputValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </form>
        {(isFocused || inputValue !== '') && <button 
          className={`input-wrapper__button button
          ${isFocused && inputValue !== '' ? 'input-wrapper__active' : ''}
          ${isFocused ? ' input-wrapper__focused' : ''}
          `}
          onClick={onSubmit}
        >
          Add
        </button>}
      </div>
      <div className={`underline ${isFocused ? 'underline__focused' : 'underline__unfocused'}`}></div>
    </>
  )
}

export default Input;