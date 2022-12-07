import './Button.scss';
import { IonIcon } from '@ionic/react';
import { forwardRef, memo } from 'react';

export function CustomButton({
  btnText,
  hasIcon = false,
  hasBorder = false,
  iconName,
  className = '',
  ...props
}, ref) {
  return(
    <button
      {...props}
      className={`
        btn-container
        ${hasIcon ? 'with-icon' : ''}
        ${hasBorder ? 'border' : ''}
        ${props.disabled ? 'disabled' : ''}
        ${className}
      `}
      ref={ref}
    >
      { btnText }
      { hasIcon && <IonIcon icon={iconName} />}
    </button>
  )
}

export const Button = memo(forwardRef(CustomButton))
