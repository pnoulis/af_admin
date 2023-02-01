/*
  @param {object} styles
  such as:
  {
    backgroundColor: 'green',
    height: '50px',
    ...
  }

  @returns {string} inline style string
  such as:
  "backgroundColor=green;height=50px;"
 */
const inlineStyle = (style) => Object
      .entries(style)
      .reduce(
        (car, [key, value]) => car += `${key}:${value};`,
        ''
      );


export  { inlineStyle };
