import cx from 'classnames'

const Spinner = (props) => {
  const { size = 'sm', color = 'black', ...rest } = props

  return (
    <div
      className="flex flex-1 items-center justify-center"
      {...rest}
    >
      <div
        className={cx(
          'inline-block animate-spin rounded-full border-r-transparent',
          {
            'h-2 w-2 border-2': size === 'xs',
            'h-4 w-4 border-2': size === 'sm',
            'h-6 w-6 border-4': size === 'md',
            'h-8 w-8 border-4': size === 'lg',
            'h-10 w-10 border-4': size === 'xl',
            'h-12 w-12 border-4': size === 'xxl',
            'border-black': color === 'black',
            'border-white': color === 'white',
          }
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
