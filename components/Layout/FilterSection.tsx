import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown";
import useDebounce from "../../utils/useDebounce";

interface Props {
  setSelectedYear: Dispatch<SetStateAction<string>>;
  setSearchedName: Dispatch<SetStateAction<string>>;
}

const FilterSection = ({
  setSearchedName, setSelectedYear
}: Props) => {
  const [studentsName, setStudentsName] = useState("");

  const debouncedValue = useDebounce(studentsName, 500);

  const listAngkatan = [
    { name: 2016 },
    { name: 2017 },
    { name: 2018 },
    { name: 2019 },
    { name: 2020 },
    { name: 2021 },
    { name: 2022 },
    { name: 2023 },
    { name: 2024 },
    { name: 2025 },
  ]

  const handleSetAngkatan = (itemData: any) => {
    setSelectedYear(itemData.name);
  }

  useEffect(() => {
    setSearchedName(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <div
        className={`w-full flex justify-start items-center py-4 xxs:max-sm:flex-col sm:max-md:flex-col md:max-lg:flex-col `}
      >
        <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
          <Dropdown
            displayText="Angkatan"
            dropdownData={listAngkatan}
            handleClickItem={handleSetAngkatan}
          />
        </div>
        <div
          className={`relative w-full lg:ml-3 xxs:max-sm:mt-2 sm:max-md:mt-2 md:max-lg:mt-2`}
        >
          <input
            type="text"
            onChange={(e) => setStudentsName(e.target.value)}
            value={studentsName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-purple-300 block w-full p-2.5 focus:outline-none "
            placeholder="Masukkan nama lengkap mahasiswa"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule={"evenodd"}
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
