import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from '../../lib/utils';

type GeneratePaginationLinksProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const generatePaginationLinks = ({
    currentPage, totalPages, onPageChange
}: GeneratePaginationLinksProps) => {
    const pages: JSX.Element[] = [];

    const createPageLink = (page: number) => (
        <PaginationItem key={page}>
            <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                className="cursor-pointer"
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    );

    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(createPageLink(i));
        }
    } else {
        pages.push(createPageLink(1));
        pages.push(createPageLink(2));

        if (currentPage > 3) pages.push(<PaginationEllipsis key="ellipsis1" />);

        if (currentPage > 2 && currentPage < totalPages - 1) {
            pages.push(createPageLink(currentPage));
        }

        if (currentPage < totalPages - 2) pages.push(<PaginationEllipsis key="ellipsis2" />);

        pages.push(createPageLink(totalPages - 1));
        pages.push(createPageLink(totalPages));
    }

    return pages;
};

type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext: boolean;
};

const Paginator = ({
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNext,
}: PaginatorProps) => (
    <Pagination className="justify-end">
        <PaginationContent>
            {showPreviousNext && totalPages && (
                <PaginationItem>
                    <PaginationPrevious
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={cn(currentPage <= 1 ? "pointer-events-none opacity-50" : undefined, currentPage > 1 ? 'cursor-pointer' : 'cursor-default')}
                    />
                </PaginationItem>
            )}
            {generatePaginationLinks({ currentPage, totalPages, onPageChange })}
            {showPreviousNext && totalPages && (
                <PaginationItem>
                    <PaginationNext
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? -1 : undefined}
                        className={cn(currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined, currentPage < totalPages ? 'cursor-pointer' : 'cursor-default')}
                    />
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>
);

export default Paginator;
