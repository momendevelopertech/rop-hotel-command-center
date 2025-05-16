
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusBadge } from './StatusBadge';
import { Search } from 'lucide-react';

// Define the column type
export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
};

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchField?: keyof T | string;
  pageSize?: number;
  className?: string;
  showHeader?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  searchField,
  pageSize = 10,
  className,
  showHeader = true,
}: DataTableProps<T>) {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'ascending' | 'descending';
  }>({ key: null, direction: 'ascending' });

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchField) return data;
    
    return data.filter(item => {
      const fieldValue = searchField === 'status'
        ? t(item[searchField] as string)
        : typeof searchField === 'string' && typeof item[searchField as keyof T] === 'string'
          ? String(item[searchField as keyof T]).toLowerCase()
          : String(item[searchField as keyof T]);
      
      return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery, searchField, t]);

  // Sort data
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle sorting
  const handleSort = (key: keyof T) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
      });
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  // Get cell value
  const getCellValue = (item: T, column: Column<T>) => {
    const accessor = column.accessor;
    
    if (column.cell) {
      return column.cell(item);
    }
    
    // If accessor is a function
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    
    // If accessor is a property key and the value is a string that needs translation
    if (accessor === 'status' && typeof item[accessor] === 'string') {
      return <StatusBadge status={item[accessor] as string} />;
    }
    
    return item[accessor];
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader className={`flex flex-col md:flex-row md:items-center md:justify-between ${dir === 'rtl' ? 'text-right' : ''}`}>
          {title && <CardTitle>{t(title)}</CardTitle>}
          {searchField && (
            <div className={`relative mt-2 md:mt-0 w-full md:w-64 ${dir === 'rtl' ? 'mr-auto' : 'ml-auto'}`}>
              <Search className={`absolute ${dir === 'rtl' ? 'right-2' : 'left-2'} top-2.5 h-4 w-4 text-gray-500`} />
              <Input
                placeholder={t("Search")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className={`pl-8 ${dir === 'rtl' ? 'pr-8 pl-4' : ''}`}
              />
            </div>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-500 font-medium">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => column.sortable && handleSort(column.accessor as keyof T)}
                    className={`
                      px-4 py-3 text-start border-b 
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''} 
                      ${dir === 'rtl' ? 'text-right' : 'text-left'}
                    `}
                  >
                    {t(column.header)}
                    {sortConfig.key === column.accessor && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 border-b"
                  >
                    {columns.map((column, colIndex) => (
                      <td 
                        key={`${rowIndex}-${colIndex}`}
                        className={`px-4 py-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      >
                        {getCellValue(item, column)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-500">
                    {searchQuery ? t("No results found") : t("No data available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`flex justify-between items-center mt-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div>
              <span className="text-sm text-gray-500">
                {t("Showing")} {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} {t("to")} {Math.min(currentPage * pageSize, filteredData.length)} {t("of")} {filteredData.length} {t("entries")}
              </span>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              >
                {t("Previous")}
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show 5 pages around current page
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 rounded border text-sm ${
                        currentPage === pageNum ? 'bg-primary text-white' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              >
                {t("Next")}
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
