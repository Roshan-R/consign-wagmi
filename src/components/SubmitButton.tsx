function SubmitButton(props: any) {
    const isLoading = props.isLoading
    return (
        <button onClick={props.onClick} type="submit" className="mt-6 text-xl font-bold mr-14 bg-peachh p-3 border-t-2 border-l-2 border-r-4 border-b-4 hover:border-b-8 border-black">
            {isLoading ?
                <>
                    <span className="animate-spin inline-block w-4 h-4 mr-2 border-[3px] border-current border-t-transparent text-black rounded-full" role="status" aria-label="loading"></span>
                    Loading
                </>
                :
                <>
                    Submit
                </>
            }
        </button>

    );
}

export default SubmitButton;
