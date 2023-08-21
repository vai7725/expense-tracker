import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchExpenseRecordsAsync,
  fetchYearsAsync,
  selectExpenseRecords,
  selectStatus,
  selectYearFilters,
} from '../expenseSlice';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Records = () => {
  const { register } = useForm();
  const filterOptions = [
    {
      id: 'month',
      name: 'Month',
      options: [
        {
          checked: false,
          value: 'January',
          label: 'January',
        },
        {
          checked: false,
          value: 'February',
          label: 'February',
        },
        {
          checked: false,
          value: 'March',
          label: 'March',
        },
        {
          checked: false,
          value: 'April',
          label: 'April',
        },
        {
          checked: false,
          value: 'May',
          label: 'May',
        },
        {
          checked: false,
          value: 'June',
          label: 'June',
        },
        {
          checked: false,
          value: 'July',
          label: 'July',
        },
        {
          checked: false,
          value: 'August',
          label: 'August',
        },
        {
          checked: false,
          value: 'September',
          label: 'September',
        },
        {
          checked: false,
          value: 'October',
          label: 'October',
        },
        {
          checked: false,
          value: 'November',
          label: 'November',
        },
        {
          checked: false,
          value: 'December',
          label: 'December',
        },
      ],
    },
    {
      id: 'year',
      name: 'Year',
      options: useSelector(selectYearFilters),
    },
    {
      id: 'mode',
      name: 'Mode',
      options: [
        { value: 'credit', label: 'Credit', checked: false },
        { value: 'debit', label: 'Debit', checked: false },
      ],
    },
    {
      id: 'paymentMethod',
      name: 'Payment Method',
      options: [
        { value: 'cash', label: 'Cash', checked: false },
        { value: 'card', label: 'Card', checked: false },
        { value: 'online', label: 'Online', checked: false },
      ],
    },
  ];
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const expenseData = useSelector(selectExpenseRecords);
  const status = useSelector(selectStatus);
  console.log(status);
  const dispatch = useDispatch();

  const totals = expenseData.reduce(
    (acc, transaction) => {
      if (transaction.mode === 'credit') acc.credit += transaction.amount;
      else if (transaction.mode === 'debit') acc.debit += transaction.amount;
      return acc;
    },
    { credit: 0, debit: 0 }
  );

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section]) newFilter[section].push(option);
      else {
        newFilter[section] = [option];
      }
    } else {
      const index = newFilter[section].findIndex((e) => e === option);
      newFilter[section].splice(index, 1);
    }
    setFilter(newFilter);
    console.log(section, option);
  };

  useEffect(() => {
    dispatch(fetchExpenseRecordsAsync(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchYearsAsync());
  }, []);

  return (
    <div className="flex flex-col">
      <div className=" flex justify-between mb-4 mx-4">
        <h2 className="text-2xl font-semibold">Your expense report</h2>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500  "
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    S. No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mode
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenseData
                  .map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {expenseData.length - index}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{`${row.date}-${row.month}-${row.year}`}</div>
                      </td>
                      <td className={'px-6 py-4 whitespace-nowrap'}>
                        <div
                          className={classNames(
                            row.mode === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600',
                            'text-sm text-gray-900'
                          )}
                        >
                          ₹{row.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{row.mode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{row.desc}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {row.paymentMethod}
                        </div>
                      </td>
                    </tr>
                  ))
                  .reverse()}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Total Credit = {totals.credit}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Total Debit = {totals.debit}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Total Savings = {totals.credit - totals.debit}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Cashflow ={' '}
                      {totals.credit - totals.debit > 0
                        ? 'Positive'
                        : 'Negative'}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 "
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filterOptions.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={optionIdx}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    {...register(section.id)}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={(e) =>
                                      handleFilter(
                                        e,
                                        e.target.name,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Records;
