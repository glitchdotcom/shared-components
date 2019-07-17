onst TYPES = ['email', 'password', 'search', 'text'];

const InputPart = ({ children, className }) => <span className={classNames(styles.inputPart, className)}>{children}</span>;

const TextInput = forwardRef(({
  autoFocus,
  className,
  disabled,
  error,
  labelText,
  maxLength,
  name,
  onChange,
  onBlur,
  onFocus,
  opaque,
  placeholder,
  postfix,
  prefix,
  testingId,
  type,
  value,
  ...props
}, ref) => {
  const uniqueId = useUniqueId();
  const outerClassName = classNames(className, styles.outer);
  const borderClassName = classNames(styles.inputBorder, {
    [styles.underline]: !opaque,
    [styles.opaque]: opaque,
  });
  const inputClassName = classNames(styles.inputPart, styles.input, {
    [styles.search]: type === 'search',
  });
  const eventProps = pickBy(props, (_, key) => key.startsWith('on'));
  return (
    <label className={outerClassName} htmlFor={uniqueId}>
      <span className={visuallyHidden}>{labelText}</span>
      <span className={borderClassName}>
        {!!prefix && <InputPart>{prefix}</InputPart>}
        <input
          {...eventProps}
          ref={ref}
          autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
          className={inputClassName}
          disabled={disabled}
          id={uniqueId}
          data-cy={testingId}
          maxLength={maxLength}
          name={name}
          onChange={(evt) => onChange(evt.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          type={type}
          value={value}
          spellCheck={type !== 'email' && type !== 'password'}
        />
        {!!error && (
          <InputPart className={styles.errorIcon}>
            <InputErrorIcon />
          </InputPart>
        )}
        {!!postfix && <InputPart>{postfix}</InputPart>}
      </span>
      {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
    </label>
  );
});