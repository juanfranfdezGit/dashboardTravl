type ButtonProps = {
    type: string;
    text: string;
};

export default function Button({ type, text }: ButtonProps) {
    return (
        <button className={type}>{text}</button>
    );
}