import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { ModeToggle } from '@/components/ui/ThemeToggle';
import { SearchInput } from '@/modules/items/SearchInput';
import { SelectInput } from '@/modules/items/SelectInput';
import csvDownload from '@/assets/svg/csv-download.svg';
import { DataTable } from '@/modules/dataTable/Table';
import { columns } from '@/modules/dataTable/Columns';
import { useGetAllShipsQuery, useSearchShipsQuery } from '@/store/api/shipsApi';
import { Toaster } from '@/components/ui/Sonner';
import { useAppSelector } from '@/store/hooks';
import { selectSelectedRows } from '@/store/slices/selectedShipSlice';
import { SelectedRows } from '@/modules/items/SelectedRows';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const selectedRows = useAppSelector(selectSelectedRows);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isLoading: isSearching } = useSearchShipsQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });

  const { data: allShips, isLoading: isLoadingAll, error } = useGetAllShipsQuery(undefined, {
    skip: !!debouncedQuery,
  });

  const ships = (debouncedQuery ? searchResults : allShips) || [];
  const isLoading = debouncedQuery ? isSearching : isLoadingAll;

  const phase = Array.from({ length: 99 }, (_, i) => ({
    value: i + 1,
    name: i + 1,
  }));

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex items-center justify-center h-screen">
          <p>Loading ships...</p>
        </div>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-600">Error loading ships</p>
        </div>
      </ThemeProvider>
    );
  }

  const vendor = [
    { value: 1, name: 'ABC Supplies Co.' },
    { value: 2, name: 'XYZ Supplies Co.' },
    { value: 3, name: '123 Supplies Co.' },
    { value: 4, name: '456 Supplies Co.' },
    { value: 5, name: '789 Supplies Co.' },
    { value: 6, name: '101 Supplies Co.' },
    { value: 7, name: '102 Supplies Co.' },
    { value: 8, name: '103 Supplies Co.' },
    { value: 9, name: '104 Supplies Co.' },
    { value: 10, name: '105 Supplies Co.' }
  ]

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ModeToggle className='absolute top-5 right-5' />
      <div className='flex flex-col gap-2 w-full items-start justify-between mt-4'>
        <div className='flex items-center justify-between w-full'>
          <h3 className='font-medium'>Items</h3>
        </div>
        <div className='flex w-full items-left justify-left gap-2'>
          <SearchInput 
            className='w-[658px]' 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <SelectInput values={phase} label="Phase" setValue={() => {}} />
          <SelectInput values={vendor} label="Vendor" setValue={() => {}} />
          <img src={csvDownload} className='cursor-pointer' alt="csv-download" />
        </div>
          {selectedRows.length > 0 && ( <SelectedRows selectedRows={selectedRows} /> )}
        <div className='w-full flex flex-col items-start justify-start'>
          <DataTable columns={columns} data={ships} />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App;
