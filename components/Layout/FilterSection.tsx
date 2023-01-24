import React, { useState } from "react"

const FilterSection = () => {
  const [title, setTitle] = useState("")
  const [angkatan, setAngkatan] = useState("")


  return (
   <>  
    <div className={`flex justify-center items-center my-5 py-4 w-5/6  xxs:max-sm:flex-col sm:max-md:flex-col md:max-lg:flex-col `}> 
     <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">       
        <select
        className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-44  hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
        onChange={(e)=>setAngkatan(e.target.value)}
        value={angkatan}>
       
          <option selected>Angkatan</option>
          <option  value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>      
        </select>         
        
      </div>
      <div className={`relative w-full lg:ml-3 xxs:max-sm:mt-2 sm:max-md:mt-2 md:max-lg:mt-2`}>
          <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-purple-300 block w-full pl-10 p-2.5 focus:outline-none " placeholder="Cari Judul / Mahasiswa" required />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule={"evenodd"}></path></svg>
      </div>      
      </div>
      </div>
      <div className="flex justify-center items-center mt-0">
       <p className="text-center">{title}</p>
      </div> 
 </>
 )
}

export default FilterSection