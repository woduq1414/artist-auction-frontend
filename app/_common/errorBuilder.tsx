export default function errorBuilder(error: any) {
    if(error === undefined) return null;
    return (
        <p className={`${error.type == 'good' ? "text-gray-800" : "text-primary"} text-md`}>
            {error.message}
        </p>
    )
}