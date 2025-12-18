import { CSVLink } from 'react-csv';
import csvDownload from '@/assets/svg/csv-download.svg';
import type { IShip } from '@/types/ship';
import { useMemo } from 'react';

export function Export(props: { ships: IShip[] }) {
  // Prepare CSV data
  const csvData = useMemo(() => {
    return props.ships.map((ship) => ({
      'Item ID': ship.itemId,
      'Item Name': ship.item.name,
      'Description': ship.item.description || '',
      'Ship To Title': ship.shipToTitle,
      'Ship To Address': ship.shipToAddress,
      'Ship From': ship.shipFrom,
      'Vendor': ship.vendor.name,
      'Quantity': ship.quantity,
      'Phase': ship.phase,
      'Location': ship.location.name,
      'Category': ship.category.name,
      'Price': ship.item.price,
      'Markup': ship.item.markup,
      'Spec': ship.item.spec,
      'Notes': ship.notes || '',
      'PO Approval': ship.poApproval || '',
      'Hotel Need By': ship.hotelNeedBy || '',
      'Expected Delivery': ship.exceptedDelivery || '',
      'Shops Send': ship.shopsSend || '',
      'Shops Approved': ship.shopsApproved || '',
      'Shops Delivered': ship.shopsDelivered || '',
      'Ordered': ship.ordered || '',
      'Shipped': ship.shipped || '',
      'Delivered': ship.delivered || '',
      'Status': ship.status ? 'Active' : 'Inactive',
    }));
  }, [props.ships]);

  const csvHeaders = [
    { label: 'Item ID', key: 'Item ID' },
    { label: 'Item Name', key: 'Item Name' },
    { label: 'Description', key: 'Description' },
    { label: 'Ship To Title', key: 'Ship To Title' },
    { label: 'Ship To Address', key: 'Ship To Address' },
    { label: 'Ship From', key: 'Ship From' },
    { label: 'Vendor', key: 'Vendor' },
    { label: 'Quantity', key: 'Quantity' },
    { label: 'Phase', key: 'Phase' },
    { label: 'Location', key: 'Location' },
    { label: 'Category', key: 'Category' },
    { label: 'Price', key: 'Price' },
    { label: 'Markup', key: 'Markup' },
    { label: 'Spec', key: 'Spec' },
    { label: 'Notes', key: 'Notes' },
    { label: 'PO Approval', key: 'PO Approval' },
    { label: 'Hotel Need By', key: 'Hotel Need By' },
    { label: 'Expected Delivery', key: 'Expected Delivery' },
    { label: 'Shops Send', key: 'Shops Send' },
    { label: 'Shops Approved', key: 'Shops Approved' },
    { label: 'Shops Delivered', key: 'Shops Delivered' },
    { label: 'Ordered', key: 'Ordered' },
    { label: 'Shipped', key: 'Shipped' },
    { label: 'Delivered', key: 'Delivered' },
    { label: 'Status', key: 'Status' },
  ];

  return (
  <CSVLink
    data={csvData}
    headers={csvHeaders}
    filename={`ships-export-${new Date().toISOString().split('T')[0]}.csv`}
    className='cursor-pointer'
  >
    <img src={csvDownload} alt="csv-download" />
  </CSVLink>
  );
}