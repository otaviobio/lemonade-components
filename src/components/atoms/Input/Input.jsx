import './Input.scss'
import { useState } from 'react';
import { forwardRef, memo } from 'react';

export function CustomInput({
  inputLabel,
  secondaryLabel,
  floatingLabel = false,
  className = '',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  hasIcon = false,
  icon,
  hasTooltip = false,
  ...props
}, ref) {

  const [focusedElement, setFocusedElement] = useState(props.value != '')
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  
  const handleFocus = (e) => {
    setFocusedElement(true)
    onFocus(e)
  };
  
  const handleBlur = (e) => {
    setFocusedElement(false)
    onBlur(e)
  };

  const handleValueChange = (e) => {
    onChange(e);
  }

  const handleTooltip = (e) => {
    setIsTooltipOpen(!isTooltipOpen)
  }


  const isFocused = props.value != ''

  return(
    <div className={`
      ${floatingLabel ? "floating-label-input-container" : "custom-input-container"}
      ${props.type === "radio" && "custom-radio-button"}
      ${props.type === "checkbox" && "custom-radio-button custom-checkbox"}
      ${className}
    `}>
      {hasTooltip
        ? 
        <div className="hasTooltip">
          <label
            className={isFocused || focusedElement ? "active" : ""}
          >
            {inputLabel}
          </label>
          <button className='tooltip' type="button" onClick={handleTooltip}>
            <span className='why'>
              <img src='https://s3.lightboxcdn.com/vendors/906a5d64-2cda-407f-a2d5-6cf94c06ddbe/uploads/274a7932-a0fd-4a89-9f58-a83cc44112ca/info.svg' width='15' height='15' alt="tooltip icon"/>
            </span>
            <span className={isTooltipOpen ? 'tip show-tip' : 'tip'}>By providing your email address you will receive updates about our company.</span>
          </button>
        </div>
        : 
        <label
          className={isFocused ? "active" : ""}
        >
          <div className="labels-container">
            <p>{inputLabel}</p>
            <p>{secondaryLabel}</p>
          </div>
        </label>
      }

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
          />
        </div>
        :
        <input
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleValueChange}
          ref={ref}
        />
      }
      {props.id === "date" && <span>YYYY-MM-DD</span>}
    </div>
  )
}

export const Input = memo(forwardRef(CustomInput))