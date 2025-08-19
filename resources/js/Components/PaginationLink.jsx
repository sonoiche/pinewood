const PaginationLink = ({ links, from, last_page, total, onChange }) => {

  const handleRedirect  = (link) => {
    onChange(link);
  }

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
      <div className="text-sm text-gray-500">Showing <span className="font-medium">{from}</span> to <span className="font-medium">{last_page}</span> of <span className="font-medium">{total}</span> results</div>
      <div className="flex space-x-2">
        {links.map((link) => {
          const isDisabled = !link.url;
          return (<button key={link.label} onClick={() => handleRedirect(link.url)} className={`px-3 py-1 rounded-md border border-blue-500 ${(!isDisabled && link.active) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-600 hover:text-white ${(isDisabled) ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={isDisabled} dangerouslySetInnerHTML={{ __html: link.label }} />);
        })}
      </div>
    </div>
  );
}

export default PaginationLink;