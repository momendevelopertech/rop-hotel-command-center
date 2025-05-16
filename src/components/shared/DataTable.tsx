
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  title?: string;
  searchField?: string;
  actions?: React.ReactNode;
  pageSize?: number;
  showHeader?: boolean;
}

export function DataTable<T>({ 
  data, 
  columns, 
  className, 
  title, 
  searchField, 
  actions,
  pageSize = 10,
  showHeader = true
}: DataTableProps<T>) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Helper function to get the value from either a string key or a function accessor
  const getValue = (item: T, accessor: keyof T | ((item: T) => any)) => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    return item[accessor];
  };

  // Filter data based on search query if searchField is provided
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchField) return data;
    
    return data.filter(item => {
      const value = typeof searchField === "string" && searchField in item 
        ? String(item[searchField as keyof T]).toLowerCase()
        : "";
      
      return value.includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, searchField]);

  // Apply pagination if pageSize is provided
  const paginatedData = useMemo(() => {
    if (!pageSize || filteredData.length <= pageSize) return filteredData;
    return filteredData.slice(0, pageSize);
  }, [filteredData, pageSize]);

  return (
    <Card className={className}>
      {(title || searchField || actions) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 px-6">
          {title && <CardTitle>{t(title)}</CardTitle>}
          <div className="flex space-x-2 items-center">
            {searchField && (
              <div className="max-w-sm">
                <Input
                  placeholder={t("Search...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            )}
            {actions && <div>{actions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            {showHeader && (
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index}>{t(column.header)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item, rowIndex) => (
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
      </CardContent>
    </Card>
  );
}
