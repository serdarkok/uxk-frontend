import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { ModeToggle } from '@/components/ui/ThemeToggle';
import { SearchInput } from '@/modules/items/SearchInput';
import { SelectInput } from '@/modules/items/SelectInput';
import csvDownload from '@/assets/svg/csv-download.svg';
import { shipService } from '@/services/ships.service';
import { DataTable } from '@/modules/dataTable/Table';
import { columns, type IShip } from '@/modules/dataTable/Columns';
import './App.css';

function App() {
  const [ships, setShips] = useState<IShip[]>([]);

  const phase = Array.from({ length: 99 }, (_, i) => ({
    value: i + 1,
    name: i + 1,
  }));

  useEffect(() => {
    const fetchShips = async () => {
      const result = await shipService.getAll();
      setShips(result);
    };
    fetchShips();
  }, []);

  console.log(ships);

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
        <h3 className='font-medium'>Items</h3>
        <div className='flex w-full items-left justify-left gap-2'>
          <SearchInput className='w-[658px]' />
          <SelectInput values={phase} label="Phase" />
          <SelectInput values={vendor} label="Vendor" />
          <img src={csvDownload} className='cursor-pointer' alt="csv-download" />
        </div>
        <div className='w-full flex flex-col items-start justify-start'>
          <DataTable columns={columns} data={ships} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App;
