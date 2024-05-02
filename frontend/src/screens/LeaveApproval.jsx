import React from "react";
import LeaveApproval from "./LeaveApproval table";

const leaveSummary = () => {

    return (
        <div className="flex h-full justify-center items-center">
      <div className="bg-black/45 h-3/4 w-3/4 rounded-[50px] py-10 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Leaves</p>
          {/* <div className="h-8 bg-red-300 w-1/2 rounded-lg">
            <input className="bg-transparent w-full h-full border-none active:border-none focus:border-0" />
    </div> */}
        </div>
        <LeaveApproval />
      </div>
    </div>
      );
}
 
export default leaveSummary;