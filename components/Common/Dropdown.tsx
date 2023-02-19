import { useState, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri"

import { useOnClickOutside } from 'usehooks-ts'

interface Props {
  displayText: string,
}

const Dropdown = ({ displayText }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpenDropdown(false));

  return (
    <div ref={ref}>
      <button
        className="relative py-2.5 px-6 flex justify-between bg-[#f4eff3] duration-300
        border-1 xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full text-[#707070]
        w-full hover:bg-[#e4e0e4] font-medium rounded-lg text-sm text-center items-center"
        type="button"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <p>{displayText}</p>
        <RiArrowDownSLine className="text-[#707070] text-xl" />
      </button>
      {openDropdown && (
        <ul className="rounded-lg absolute mt-1 z-50 w-full bg-[#ffffff]">
          <li className="py-2 px-4 hover:bg-[#f8f8f8] duration-200 cursor-pointer"
            onClick={() => {
              setOpenDropdown(false);
            }}
          >
            list 1
          </li>
        </ul>
      )}
    </div>
  )
}

export default Dropdown