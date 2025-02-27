import * as React from "react";
import { Icons } from "../icons";
import { cn } from "@infrastructure";
import { LinkButton } from "../LinkButton";
import { Text } from "../Typography";

const PaginationRoot = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(
      "mx-auto my-2 grid md:grid-cols-3 grid-cols-1 w-full justify-center p-3 gap-y-1",
      className
    )}
    {...props}
  />
);
PaginationRoot.displayName = "PaginationRoot";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "col-span-1 md:col-start-2 flex flex-row items-center justify-center gap-1",
      className
    )}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  href: string;
  disabled?: boolean;
} & React.ComponentProps<"a">;

const PaginationLink = ({
  children,
  isActive,
  href,
  //disabled,
}: PaginationLinkProps) => (
  <LinkButton
    href={href}
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "outline" : "ghost"}
    size="default"
    //disabled={disabled}
  >
    {children}
  </LinkButton>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <Icons.CARET_LEFT className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <Icons.CARET_RIGHT className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Icons.THREE_DOTS_HORIZONTAL className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

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
        <Text variant="secondary">
          Showing {Math.min(currentPage * pageSize + 1, totalRowCount)} to{" "}
          {Math.min((currentPage + 1) * pageSize, totalRowCount)} of{" "}
          {totalRowCount}
        </Text>
      </div>
    </PaginationRoot>
  );
};
