import React, { useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Button,
  Checkbox,
  MultiSelect,
  Stack,
  TextInput,
  MantineProvider,
} from '@mantine/core';
import { DatePicker, type DatesRangeValue } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import dayjs from 'dayjs';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

function ListUser() {
  const companies = [
    {
      id: '1323addd-a4ac-4dd2-8de2-6f934969a0f1',
      name: 'Feest, Bogan and Herzog',
      streetAddress: '21716 Ratke Drive',
      city: 'Stromanport',
      state: 'WY',
      missionStatement: 'Innovate bricks-and-clicks metrics.',
    },
    {
      id: '0cf96f1c-62c9-4e3f-97b0-4a2e8fa2bf6b',
      name: 'Cummerata - Kuhlman',
      streetAddress: '6389 Dicki Stream',
      city: 'South Gate',
      state: 'NH',
      missionStatement: 'Harness real-time channels.',
    },
    {
      id: 'bba53ee9-385f-4b3d-a9a4-613ced38ff2c',
      name: 'Goyette Inc',
      streetAddress: '8873 Mertz Rapid',
      city: 'Dorthyside',
      state: 'ID',
      missionStatement: 'Productize front-end web services.',
    },
    {
      id: '3d80d34a-4aff-468a-b4e5-e17658f7635e',
      name: 'Runte Inc',
      streetAddress: '2996 Ronny Mount',
      city: 'McAllen',
      state: 'MA',
      missionStatement: 'Engage synergistic infrastructures.',
    },
    {
      id: '3ae22e52-335e-4e49-9e26-f5e0089edb76',
      name: 'Goldner, Rohan and Lehner',
      streetAddress: '632 Broadway Avenue',
      city: 'North Louie',
      state: 'WY',
      missionStatement: 'Incubate cross-platform metrics.',
    },
    {
      id: '6e9372ad-6b30-40c1-bd05-30211cd00ed2',
      name: "Doyle, Hodkiewicz and O'Connell",
      streetAddress: '576 Joyce Ways',
      city: 'Tyraburgh',
      state: 'KS',
      missionStatement: 'Scale web-enabled e-business.',
    },
    {
      id: '2d0ddea1-ee92-477e-8d63-6d0508749ae6',
      name: "Rau - O'Hara",
      streetAddress: '7508 Lansdowne Road',
      city: 'Shieldsborough',
      state: 'MI',
      missionStatement: 'Innovate real-time applications.',
    },
  ];

  const initialRecords = companies;
  const PAGE_SIZE = 5;
  // state untuk pagination
  const [page, setPage] = useState(1);
  // state data di datatable
  const [records, setRecords] = useState(initialRecords.slice(0, PAGE_SIZE));
  // state search data
  const [search, setSearch] = useState<string>('');
  // state menampung hasil data(hasil search atau tidak)
  const [query, setQuery] = useState('');

  // fungsi untuk menghentikan sementara proses pencarian agar setiap perubahan tidak langsung search
  const debouncedQuery = useDebouncedValue(query, 200);

  useEffect(() => {
    setQuery(search); // Memperbarui nilai query saat nilai pencarian berubah
  }, [search]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(
      companies
        .filter(({ name, streetAddress, city, state }) => {
          const lowerCaseQuery = debouncedQuery[0].trim().toLowerCase(); // Mengambil nilai dari tuple
          return (
            name.toLowerCase().includes(lowerCaseQuery) ||
            streetAddress.toLowerCase().includes(lowerCaseQuery) ||
            city.toLowerCase().includes(lowerCaseQuery) ||
            state.toLowerCase().includes(lowerCaseQuery)
          );
        })
        .slice(from, to)
    );
  }, [page, debouncedQuery, companies]);
  return (
    <>
      <div>ListUser</div>
      <MantineProvider defaultColorScheme="auto">
        <div>
          <div className="text-right">
            <input
              type="text"
              className="form-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          <DataTable
            height={300}
            withTableBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            // withTableBorder
            // withColumnBorders
            records={records}
            columns={[
              {
                accessor: 'name',
              },
              { accessor: 'streetAddress' },
              { accessor: 'city' },
              { accessor: 'state' },
            ]}
            totalRecords={companies.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
            styles={{
              table: {
                borderCollapse: 'collapse', // mengatur agar border dari sel-sel tabel bergabung
                width: '100%', // lebar tabel 100% dari kontainer
                border: '1px solid #ddd', // gaya border tabel
              },
              // Anda juga dapat menambahkan gaya untuk baris, sel, dan header kolom di sini
            }}
          />
        </div>
      </MantineProvider>
    </>
  );
}

export default ListUser;
