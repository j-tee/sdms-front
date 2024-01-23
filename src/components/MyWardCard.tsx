import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getMyWards } from '../redux/slices/parentSlice'
import { QueryParams } from '../models/queryParams'
import { Link } from 'react-router-dom'
import MyWardDetails from './MyWardDetails'

const MyWardCard = (props: any) => {
  const {myWards, parent} = useSelector((state:RootState) => state.parent)  
  const dispatch= useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
    parent_id: parent.id,
    paginate: true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  useEffect(() => {
    dispatch(getMyWards(params))
  }, [dispatch])
    return (
    <>
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
    <Header />
    <Card>
      <Card.Header>
        <Card.Title className='fs-1 text-muted'>My Wards</Card.Title>
      </Card.Header>
     {myWards.map((ward: any, index: any) => {
        return (
          <MyWardDetails key={index} student={ward} />
        )
     })}
    </Card>
    </>
  )
}

export default MyWardCard
