
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Column<T = any> {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchField?: keyof T | string;
  pageSize?: number;
  showHeader?: boolean;
  actions?: React.ReactNode;
}

export function DataTable<T = any>({
  data,
  columns,
  title,
  searchField,
  pageSize = 10,
  showHeader = true,
  actions
}: DataTableProps<T>) {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search query
  const filteredData = searchQuery && searchField
    ? data.filter(item => {
        let value: string;
        if (typeof searchField === 'string') {
          // Handle string accessors safely by explicitly checking if it exists as a key
          const key = searchField as keyof T;
          // Check if the key exists in the item
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            value = String(item[key] || '');
          } else {
            // If the key doesn't exist, return false to filter out this item
            return false;
          }
        } else {
          value = String(item[searchField as keyof T] || '');
        }
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : data;

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get cell value based on accessor type
  const getCellValue = (item: T, accessor: keyof T | ((item: T) => any)) => {
    if (typeof accessor === "function") {
      return accessor(item);
    }
    return item[accessor];
  };

  return (
    <div>
      {showHeader && (
        <div className="mb-4 flex justify-between items-center">
          {title && <h3 className="font-medium text-lg">{t(title)}</h3>}
          
          <div className="flex items-center gap-2">
            {searchField && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder={t("Search...")}
                  className="pl-8 max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr className={`border-b ${dir === "rtl" ? "text-right" : ""}`}>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 font-medium"
                  >
                    {t(column.header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`hover:bg-gray-50 ${dir === "rtl" ? "text-right" : ""}`}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-4 py-3">
                        {column.cell
                          ? column.cell(row)
                          : getCellValue(row, column.accessor)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    {t("No data available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {t("Showing")} {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredData.length)} {t("of")}{" "}
            {filteredData.length} {t("entries")}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              {t("Previous")}
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
