export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded cursor-pointer shadow transition duration-150 ease-in-out transform hover:-translate-y-0.5 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
