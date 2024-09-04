/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

import { _bp } from './src/lib/vars'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '900': '900px',
        '1800': '1800px',
        '2400': '2400px'
      },
      scale: {
        '102.5': '1.025',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
      },
      gridAutoColumns: {
        's': '34%',
        'm': '43%',
        'l': '72%', 
        'xs': '23%',
        'xl': '95%',
        'mc': 'min-content',
      },
      gridTemplateRows: {
        // Simple 16 row grid
        'mc': 'min-content',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
    screens: {
      'default': _bp.default + 'rem',
      'xlarge': _bp.xlarge + 'rem',
      'large': _bp.large + 'rem',
      'medium':  _bp.medium + 'rem',
      'small': _bp.small + 'rem',
      'xsmall': _bp.xsmall + 'rem',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xlg': '1.5rem',
      'full': '9999px',
      's' : '6px',
      'm' : '12px',
      'l' : '24px',
    }
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('optional', '&:optional')
      addVariant('hocus', ['&:hover', '&:focus'])
    })
  ]
}

