
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchField?: keyof T;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends object>({
  data,
  columns,
  title,
  searchField,
  actions,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = searchField
    ? data.filter((item) => {
        const value = item[searchField];
        return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : data;

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get cell value based on accessor (string or function)
  const getCellValue = (item: T, accessor: keyof T | ((item: T) => any)) => {
    if (typeof accessor === "function") {
      return accessor(item);
    }
    return item[accessor];
  };

  return (
    <Card className="p-0 shadow-sm border border-border">
      {(title || searchField || actions) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-border">
          {title && <h2 className="font-medium text-lg mb-3 md:mb-0">{title}</h2>}
          
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
            {searchField && (
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="pl-9"
                />
              </div>
            )}
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}

      <div className="w-full overflow-auto">
        {paginatedData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                {columns.map((column, i) => (
                  <th key={i} className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={cn(
                    "border-b border-border last:border-0 transition-colors hover:bg-muted/30",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-muted/10"
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="p-4 align-middle">
                      {column.cell
                        ? column.cell(item)
                        : getCellValue(item, column.accessor)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center p-8 text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show first page, last page, current page, and pages adjacent to current
              let pagesToShow = [];
              if (totalPages <= 5) {
                pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
              } else if (currentPage <= 3) {
                pagesToShow = [1, 2, 3, 4, totalPages];
              } else if (currentPage >= totalPages - 2) {
                pagesToShow = [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
              } else {
                pagesToShow = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
              }
              
              const page = pagesToShow[i];
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? "bg-primary text-primary-foreground" : ""}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
