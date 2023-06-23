function Input(props: any) {
    return (
        <>
            <label className="block text-xl text-gray-700 font-roboto font-bold mb-1">{props.name}</label>
            <input type={props.type} onChange={props.onChange} value={props.value} className="mb-5 h-9 bg-gray-300" />
        </>
    );
}
export default Input

