import { useState, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri"

import { useOnClickOutside } from 'usehooks-ts'

interface Props {
  displayText: string,
  dropdownData: any[],
  handleClickItem: (itemData: any) => void
}

const Dropdown = ({ displayText, dropdownData, handleClickItem }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItemText, setSelectedItemText] = useState("");

  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpenDropdown(false));

  return (
    <div ref={ref} className="w-full relative ">
      <button
        className="py-2.5 px-6 flex justify-between bg-[#f4eff3] duration-300
        border-1 xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full text-[#707070]
        w-full hover:bg-[#e4e0e4] font-medium rounded-lg text-sm text-center items-center"
        type="button"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <p>{!selectedItemText ? displayText : selectedItemText}</p>
        <RiArrowDownSLine className="text-[#707070] text-xl" />
      </button>
      {openDropdown && (
        <ul className="rounded-lg absolute mt-1 z-50 
          w-full max-h-48 overflow-auto bg-[#ffffff]"
        >
          <li
            key={"reset"}
            className="sticky top-0 z-10 py-2 px-4 hover:bg-[#f8f8f8] 
              duration-200 cursor-pointer bg-white"
            onClick={() => {
              handleClickItem("");
              setSelectedItemText("")
              setOpenDropdown(false);
            }}
          >
            Reset
          </li>
          {dropdownData.map(item => (
            <li
              key={item.id}
              className="py-2 px-4 hover:bg-[#f8f8f8] duration-200 cursor-pointer"
              onClick={() => {
                handleClickItem(item);
                setSelectedItemText(item.name)
                setOpenDropdown(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown