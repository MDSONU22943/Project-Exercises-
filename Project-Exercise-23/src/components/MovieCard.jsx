function MovieCard({title, rating, onDelete}){

    return (
        <div className="bg-white shadow-md p-4 rounded mb-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-600">{rating}</p>
            </div>
            <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Delete
            </button>
        </div>
    )
}

export default MovieCard