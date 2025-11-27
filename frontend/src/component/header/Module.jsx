import React, { useContext } from "react";
// import dropDown from "../../assets/dropDown.svg";
import { authData } from '../../context/AuthContext';

const Module = () => {
    const {module,setModule} = useContext(authData)
//   const [module, setModule] = useState("Lens");

  return (
    <div className="flex flex-col pt-2">
      <p className="font-bold">Module</p>

      <div >
        {/* how to remove the drop down icon of this  */}
        <select
          name="module"
          id="module"
          className="text-lg m-[-5px]"
          value={module}
          onChange={(e) => {
            setModule(e.target.value);
          }}
        >
          <option value="Lens">Lens</option>
          <option value="Tuner">Tuner</option>
          <option value="Commit">Commit</option>
        </select>
      </div>
      {/* <p className='text-lg'>Lens</p>
        <img src={dropDown} alt="DD" className="w-5" /> */}
    </div>
  );
};

export default Module;
