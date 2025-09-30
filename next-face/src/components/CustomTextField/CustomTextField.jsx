import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function CustomTextField({
  label,
  required = false,
  multiline = false,
  minRows = 3,
  sx = {},
  error,
  isPassword = false,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const borderColor = error ? '#d32f2f' : '#D1D5DB';

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <Typography sx={{ mb: '0.444rem', fontSize: '1rem', color: '#111928' }}>
          {label}
          {required && (
            <span style={{ color: '#940000', marginLeft: 2 }}>*</span>
          )}
        </Typography>
      )}

      <TextField
        variant="outlined"
        multiline={multiline}
        minRows={multiline ? minRows : undefined}
        type={isPassword && !showPassword ? 'password' : 'text'}
        inputProps={{
          ...(isPassword && {
            autoComplete: 'current-password',
            'data-testid': 'password-input',
          }),
        }}
        sx={{
          borderRadius: '0.444rem',
          fontWeight: 400,
          fontSize: '1rem',
          color: '#222',
          borderColor,
          '& .MuiFormHelperText-root': { marginLeft: 0 },
          ...sx,
        }}
        error={error}
        InputProps={{
          sx: {
            bgcolor: '#F9FAFB',
            '& .MuiOutlinedInput-notchedOutline': { borderColor },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor,
              borderWidth: '1px',
            },
            '& input': {
              paddingBlock: '0.778rem',
              paddingInline: '0.889rem',
            },
            '& input::placeholder': {
              color: '#8F8F8F',
              fontSize: '1rem',
              opacity: 1,
            },
            '& textarea::placeholder': {
              color: '#8F8F8F',
              fontSize: '1rem',
              opacity: 1,
            },

            /* Hide native browser reveal/clear icons (Edge/Safari) */
            '& input::-ms-reveal, & input::-ms-clear': { display: 'none' }, // Edge/IE
            '& input[type="password"]::-webkit-credentials-auto-fill-button': {
              display: 'none',
            }, // Safari/Chrome
            '& input[type="password"]::-webkit-textfield-decoration-container':
              { display: 'none' }, // older Safari
            
            /* Mobile-specific password field fixes */
            '& input[type="password"]': {
               WebkitTextFillColor: '#111',
              WebkitTextSecurity: 'disc', // Ensure password dots show on mobile
              fontFamily: 'text-security-disc, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            },
            
            /* Ensure password visibility on mobile */
            '@media (max-width: 768px)': {
              '& input[type="password"]': {
                fontSize: '16px', // Prevent zoom on iOS
                WebkitTextSecurity: 'disc',
                fontFamily: 'text-security-disc, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              },
            },
          },

          endAdornment: isPassword && (
            <InputAdornment position="end" sx={{ pr: 1 }}>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(prev => !prev)}
                onMouseDown={e => e.preventDefault()} // keep focus in the field
                edge="end"
                sx={{
                  p: 0.5, // smaller button padding
                  ml: '10px', // left padding you asked for
                }}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    </div>
  );
}
