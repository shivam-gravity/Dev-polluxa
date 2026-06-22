"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import cx from "classnames";

export default function Pagination({ currentPage, pageCount }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageLink = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const renderPageLinks = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={createPageLink(page)}
            className={cx("px-4 py-2 border rounded ", {
              "bg-[#003464] text-white": currentPage === page,
              "border-[#A6A6A6] text-[#333333] hover:bg-[#F2F4F8]":
                currentPage !== page,
            })}
          >
            {page}
          </Link>
        );
      }),
    [pageCount, createPageLink, currentPage]
  );

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 my-6">
      {currentPage > 1 && (
        <Link
          href={createPageLink(currentPage - 1)}
          className="px-4 py-2 border border-[#A6A6A6] rounded hover:bg-[#F2F4F8] text-[#333333]"
        >
          Previous
        </Link>
      )}

      {renderPageLinks}

      {currentPage < pageCount && (
        <Link
          href={createPageLink(currentPage + 1)}
          className="px-4 py-2 border border-[#A6A6A6] rounded hover:bg-[#F2F4F8] text-[#333333]"
        >
          Next
        </Link>
      )}
    </div>
  );
}
