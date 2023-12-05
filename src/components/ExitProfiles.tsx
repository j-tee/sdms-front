import React from 'react'

const ExitProfiles = (props: any) => {
    const { schoolId, branchId, tabIndex } = props;
    return (
        <h1>
            {schoolId} {branchId} {tabIndex}
        </h1>
    )
}

export default ExitProfiles
