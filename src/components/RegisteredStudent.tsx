import React from 'react'

const RegisteredStudent = (props: any) => {
    const {params, branchId, schoolId} = props;
  return (
    <div>
      <h1>Registered Students {branchId} {schoolId} {params.department_id}</h1>
    </div>
  )
}

export default RegisteredStudent
