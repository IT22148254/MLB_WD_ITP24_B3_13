import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


// import OMHome from '../pages/OMdashboard/OMHome'

// import Schedule from '../pages/schedule/Schedule'
// import EditInstructor from '../pages/schedule/scheduleEdit/EditInstructor'
// import EditTimeSlot from '../pages/schedule/scheduleEdit/EditTimeSlot'
// import ScheduleTable from '../pages/schedule/ScheduleTable'
// import InstructorConfirmOM from '../pages/schedule/InstructorConfirmOM'

import StandardPackages from '../Pages/extra/StandardPackages'
import EditStandard from '../pages/Membership/EditStandard'
import PromoPackages from '../pages/Membership/PromoPackages'
import AddNewPromo from '../pages/Membership/AddNewPromo'
import PromoApproval from '../pages/Membership/PromoApproval'
import MMdashboard from '../pages/Membership/MMdashboard'
import MembershipPackages from '../pages/Membership/MembershipPackages'
import CreatedPromos from '../Pages/Manager/CreatedPromos'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/index' />} />

            {/* operation manager homepage */}
            {/* <Route path="/home" element={<OMHome />} /> */}

            {/* Schedule pages routing */}
            {/* <Route path="/schedule" element={<Schedule />} />
            <Route path="/changetimeslot" element={<EditTimeSlot />} />
            <Route path="/changeinstrutor" element={<EditInstructor />} />
            <Route path="/trainings" element={<ScheduleTable />} />
            <Route path="/confirmation" element={<InstructorConfirmOM />} /> */}

            {/* membership package */}
            <Route path="/standardpackages" element={<StandardPackages />} />
            <Route path="/editstandard/:id" element={<EditStandard />} />
            <Route path="/promopackages" element={<PromoPackages />} />
            <Route path="/newpromo" element={<AddNewPromo />} />
            <Route path="/promoapproval" element={<PromoApproval />} />
            <Route path="/mmdashboard" element={<MMdashboard />} />
            <Route path="/membershippackages" element={<MembershipPackages />} />
            <Route path="/createdpromos" element={<CreatedPromos/>} />

        </Routes>
    )
}

export default Router;