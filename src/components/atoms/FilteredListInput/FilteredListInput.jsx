import './FilteredListInput.scss'
import { useState } from 'react';
import { forwardRef, memo } from 'react';

export function CustomFilteredListInput({
  inputLabel,
  secondaryLabel,
  floatingLabel = false,
  className = '',
  onChange = () => {},
  onChangeText = () => {},
  onFocus = () => {},
  onBlur = () => {},
  hasIcon = false,
  list = [],
  icon,
  inputValue,
  // renderItem,
  // keyExtractor,
  ...props
}, ref) {

  const [focusedElement, setFocusedElement] = useState(inputValue != '')
  
  const handleFocus = (e) => {
    setFocusedElement(true)
    onFocus(e)
  };
  
  const handleBlur = (e) => {
    setFocusedElement(false)
    onBlur(e)
  };

  const handleValueChange = (e) => {
    // onChange(e);
    onChangeText(e.target.value)
  }

  const handleListItemClick = (value) => {
    // const e = {target: {value: value, name: props.name}}
    onChange(value)
  }


  const isFocused = inputValue != ''

  return(
    <div className={`
      ${floatingLabel ? "floating-label-input-container" : "custom-input-container"}
      ${className}
    `}>
      <label
        className={isFocused ? "active" : ""}
      >
        <div className="labels-container">
          <p>{inputLabel}</p>
          <p>{secondaryLabel}</p>
        </div>
      </label>
      {hasIcon
        ?
        <div className="hasIcon">
          <span>{icon}</span>
          <input
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleValueChange}
            ref={ref}
            value={inputValue}
          />
        </div>
        :
        <input
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleValueChange}
          ref={ref}
          value={inputValue}
        />
      }
      {focusedElement === true && 
        <ul className="floating-label-select">
          {list.map((listItem) => {
            if(listItem !== undefined) {
              return(
                <li key={listItem} onMouseDown={() => handleListItemClick(listItem)}>{listItem}</li>
              )
            }
            return null
          })}
        </ul>
      }
    </div>
  )
}

export const FilteredListInput = memo(forwardRef(CustomFilteredListInput))
