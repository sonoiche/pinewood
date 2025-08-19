export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'fs-7 text-red-500 text-sm ' + className}
        >
            {message}
        </p>
    ) : null;
}
