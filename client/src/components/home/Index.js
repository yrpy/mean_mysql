import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const pagesList = [5, 8, 10]

const Home = () => {
    const [data, setData] = useState([])
    const [dataPerPage, setDataPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPatientsData = () => {
        axios.get('http://localhost:5000/patients')
        .then( res => setData(res.data))
        .catch(err => console.error(err))
    }
    useEffect(() => {
        fetchPatientsData()
    },[])

    /* ------------ Pagination -------------- */
    const numOfTotalPages = Math.ceil(data.length/dataPerPage)
    const pages = [...Array(numOfTotalPages+1).keys()].slice(1)

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const visibleData = data.slice(indexOfFirstData, indexOfLastData)

    const prevPageHandler = () => {if(currentPage !== 1) setCurrentPage(currentPage - 1 )}
    const nextPageHandler = () => { if( currentPage !== numOfTotalPages ) setCurrentPage(currentPage + 1)}
    /* ------------ Pagination //------------ */

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/patients/${id}`)
            window.location.reload()
        }catch(err){
            console.error(err)
        }
    }

  return (
    <div>
      <h1>Patients Info</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>purpose</th>
          <th>fee</th>
          <th style={{width: '60px'}}>#</th>
        </tr>
      </thead>
      <tbody>
        {visibleData.map((o, i) => {
            return <tr key={i}>
                        <td>{o.id}</td>
                        <td>{o.name}</td>
                        <td>{o.age}</td>
                        <td>{o.purpose}</td>
                        <td>{o.fee}</td>
                        <td className='d-flex justify-content-between'>
                            <Link to={`/update/${o.id}`}><i className="bi bi-pencil-square"></i></Link> <Link onClick={() => handleDelete(o.id)}><i className="bi bi-trash3"></i></Link>
                        </td>
                    </tr>
        })}
        
      </tbody>
    </Table>
    <Card className='flex-row justify-content-between align-items-center'>
        <Pagination className='m-0'>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev onClick={prevPageHandler} />
                { pages.map((o) => <Pagination.Item key={o} className={`${currentPage === o ? 'active' : ''}`} onClick={() => setCurrentPage(o)}>{o}</Pagination.Item> ) }
            <Pagination.Next onClick={nextPageHandler} />
            <Pagination.Last onClick={() => setCurrentPage(numOfTotalPages)} />
        </Pagination>
        <Form.Select size="sm" className='w-25' onChange={(e) => setDataPerPage(e.target.value)}>
            <option value={dataPerPage}>Select Per Page</option>
            {pagesList.map(o => <option key={o} value={o}>{o}</option> )}
        </Form.Select>
    </Card>
    </div>
  )
}

export default Home
