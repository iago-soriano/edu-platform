import {
  PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components";

export const Pagination = ({
  currentPage,
  path,
  totalRowCount,
  pageSize = 10,
}) => {
  const totalPages = Math.ceil(totalRowCount / pageSize);

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 0}
            href={`${path}?page=${currentPage - 1}`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage + 1 === pageNumber}
                href={`${path}?page=${pageNumber - 1}`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            disabled={Math.min(currentPage + 1, totalRowCount) === totalPages}
            href={`${path}?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
      <div className="md:col-start-3 col-span-1 flex flex-row items-center md:justify-end justify-center mr-3">
        {/* pagination summary */}
        Showing {Math.min(currentPage * pageSize + 1, totalRowCount)} to{" "}
        {Math.min((currentPage + 1) * pageSize, totalRowCount)} of{" "}
        {totalRowCount}
      </div>
    </PaginationRoot>
  );
};
