import React from 'react'

const ProgramList = (props: any) => {
    const {prog} = props;
  return (
    <div className='fs-5 text-muted p-2 border-bottom'>
      {prog.prog_name} Program      
    </div>
  )
}

export default ProgramList
