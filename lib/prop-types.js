import PropTypes from 'prop-types'

export const oneOfObject = (object) => {
  const keys = Object.keys(object)
  const fn = PropTypes.oneOf(keys).isRequired
  fn.toString = () => keys.join(' | ')
  return fn
}

export const func = (signature) => {
  const fn = (...args) => PropTypes.func.isRequired(...args)
  fn.toString = () => signature
  return fn
}

export const docstring = Symbol[docstring]

export const documentation = (Component, docstring, propTypes) => {
  // TODO: if development build { }
  Component[docstring] = docstring
  
  if (propTypes) {
    Component.propTypes = {}
    Component.defaultProps = {}
    for (const [key, value] of Object.entries(propTypes)) {
      if value
    }
  }
}