// copied from the breakpoint.scss
export const _bp = {
    default: 105,
    xlarge: 86,
    large: 70.5,
    medium: 48,
    small: 30,
    xsmall: 22.5,
  };

export const misc =  {
    'z-index-base':	10000,
};
    

//TODO: this is not used
// Duration.
export const duration = {
    menu:				'0.5s',
    transition:			'0.2s',
};
    
// Size.
export const size = {
    'element-height':		'3rem',
    'element-margin':		'2rem',
    padding:			'2rem',
    wrapper:			'72rem'
};

// Font.
export const font = {
    'family':				"('Merriweather', Georgia, serif)",
    'family-heading':		"('Source Sans Pro', Helvetica, sans-serif)",
    'family-fixed':		"('Courier New', monospace)",
   'weight':				300,
    'weight-bold':		600,
    'weight-heading':		900
};

// Palette.
export const palette = {
    'wrapper-bg':			'#212931',

    'bg':					'#ffffff',
    'fg':					'#212931',
    'fg-bold':			'#212931',
   'fg-light':			'mix(#212931, #ffffff, 50%)',
    'border':				'mix(#dcdcdc, #ffffff, 50%)',
    'border-bg':			'rgba(#dcdcdc, 0.25)',
    'accent':				'#18bfef',

    'alt': {
        'bg':				"#f5f5f5",
        'fg':				'#717981',
        'fg-bold':		'#717981',
        'fg-light':		'mix(#717981, #f5f5f5, 50%)',
        'border':			'mix(#dcdcdc, #f5f5f5, 75%)',
        'border-bg':		'rgba(#dcdcdc, 0.5)',
        'accent':			'#18bfef',
    },

    'invert': {
        'bg':				'#1e252d',
        'bg-alt':			'#1e252d',
        'fg':				'#ffffff',
        'fg-bold':		'#ffffff',
       'fg-light':		'rgba(#ffffff, 0.5)',
        'border':			'#ffffff',
        'border-bg':		'rgba(#ffffff,0.075)',
        'accent':			'#18bfef',
    },
};