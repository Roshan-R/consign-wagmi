function Button({ text }: { text: string }) {
    return (
        <button className="text-xl font-bold w-max mt-5 mr-2 bg-peachh p-3 border-t-2 border-l-2 border-r-4 border-b-4 hover:border-b-8 border-black">
            {text}
        </button>
    );
}

export default Button;
