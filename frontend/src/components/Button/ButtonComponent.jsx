import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ButtonComponent({
    text,
    color,
    textColor,
    href,
    onClick,
    borderRadius,
    startIcon,
    endIcon,
    type,
    size,
    className,
    fontWeight,
    disabled = false,
    preventValidation = false,
    margin = '8px'
}) {
    return (
        <Button
            variant='contained'
            startIcon={startIcon}
            endIcon={endIcon}
            component={href ? Link : 'button'}
            to={href}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
            style={{
                backgroundColor: preventValidation ? 'var(--light-purple)' : color ?? 'var(--main-purple)',
                color: textColor ?? 'white',
                fontFamily: 'Poppins',
                textTransform: 'initial',
                padding: '5px 10px',
                borderRadius: borderRadius ?? '10px',
                fontWeight: fontWeight ?? '300',
                margin: margin,
                fontSize: size ?? '1rem',
                cursor: preventValidation ? 'not-allowed' : 'pointer'
            }}>
            {text}
        </Button>
    );
}

export default ButtonComponent; 