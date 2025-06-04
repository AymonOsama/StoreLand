// components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border rounded hover:bg-blue-100 disabled:opacity-40"
      >
        ←
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-white hover:bg-blue-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white border rounded hover:bg-blue-100 disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
