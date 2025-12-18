import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { ModeToggle } from '@/components/ui/ThemeToggle';
import { SearchInput } from '@/modules/items/SearchInput';
import { SelectInput } from '@/modules/items/SelectInput';
import { DataTable } from '@/modules/dataTable/Table';
import { columns } from '@/modules/dataTable/Columns';
import { useGetAllShipsQuery, useSearchShipsQuery } from '@/store/api/shipsApi';
import { useGetVendorsQuery } from '@/store/api/vendorApi';
import { Toaster } from '@/components/ui/Sonner';
import { useAppSelector } from '@/store/hooks';
import { selectSelectedRows } from '@/store/slices/selectedShipSlice';
import { SelectedRows } from '@/modules/items/SelectedRows';
import { useState, useEffect } from 'react';
import { Export } from '@/modules/dataTable/Export';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
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

  const { data: allShips, isLoading: isLoadingAll, error: errorShips } = useGetAllShipsQuery(undefined, {
    skip: !!debouncedQuery,
  });

  const { data: allVendors } = useGetVendorsQuery();

  const vendors = allVendors?.map((vendor) => ({
    value: vendor.id,
    name: vendor.name,
  }));

  const allShipsData = (debouncedQuery ? searchResults : allShips) || [];
  
  // Apply vendor and phase filters
  const ships = allShipsData.filter((ship) => {
    const matchesVendor = selectedVendor === null || ship.vendorId == selectedVendor;
    const matchesPhase = selectedPhase === null || ship.phase == selectedPhase;
    return matchesVendor && matchesPhase;
  });

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

  if (errorShips) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-600">Error loading ships</p>
        </div>
      </ThemeProvider>
    );
  }

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
          <SelectInput 
            values={phase} 
            label="Phase" 
            setValue={(value) => setSelectedPhase(value ? Number(value) : null)} 
          />
          {vendors && (
            <SelectInput 
              values={vendors} 
              label="Vendor" 
              setValue={(value) => setSelectedVendor(value ? Number(value) : null)} 
            />
          )}
          <Export ships={ships} />
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
