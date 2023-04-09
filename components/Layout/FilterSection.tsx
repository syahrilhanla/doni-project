import React, { Dispatch, SetStateAction, useState } from "react";
import Dropdown from "../Common/Dropdown";

interface Props {
  setSelectedYear: Dispatch<SetStateAction<number>>;
  setSearchedName: Dispatch<SetStateAction<string>>;
}

const FilterSection = ({
  setSearchedName, setSelectedYear
}: Props) => {
  const [title, setTitle] = useState("");
  const [angkatan, setAngkatan] = useState("");

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
    setAngkatan(itemData);
    setSelectedYear(itemData.name);
  }

  return (
    <>
      <div
        className={`w-full flex justify-start items-center my-5 py-4  xxs:max-sm:flex-col sm:max-md:flex-col md:max-lg:flex-col `}
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-purple-300 block w-full pl-10 p-2.5 focus:outline-none "
            placeholder="Cari Judul / Mahasiswa"
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
