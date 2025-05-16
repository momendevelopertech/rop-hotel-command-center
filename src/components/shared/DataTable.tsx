
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

// Define a more flexible Column type that accepts either a string key or a function accessor
export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  const { t } = useLanguage();
  
  // Helper function to get the value from either a string key or a function accessor
  const getValue = (item: T, accessor: keyof T | ((item: T) => any)) => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    return item[accessor];
  };

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{t(column.header)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.cell ? column.cell(item) : getValue(item, column.accessor)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                {t("No data found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
