import { Card, Container, Table } from "react-bootstrap"
import { RestService } from "../../rest"

import './statementForm.css'
import { useEffect, useState } from "react"

export let StatementForm = () => {
    const [transactions, setTransactions] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    let loadData = async () => {
        let token = localStorage.getItem("token")
        let user = JSON.parse(localStorage.getItem('user'))
        let limit = 5
        let skip = page * 5 - 5
        let body =`userId=${user._id}&skip=${skip}&limit=${limit}`
        let result = await RestService.getAllTransactions(body, token)
        if(result?.success){
            setTransactions(result?.data)
            setTotalPages(Math.ceil(result.total/5))
        }
    }
    
    useEffect(()=>{
        loadData();
    },[page])

    let getFormatedTime = (date) => {
        return new Date(date).toLocaleString('en-GB', 
        { day: 'numeric', 
        month: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute:'numeric', 
        hour12: true }).replace(',', '')
    }

    const selectPageHandler = (selectedPage) => {
        if(
            selectedPage >= 1 && 
            selectedPage <= totalPages && 
            selectedPage !== page
        ){
            setPage(selectedPage)
        }
    }
    return(
        <Container> 
            <Card className="mx-auto mt-5 rounded-1 newCard">
                <Card.Header className='bg-white fs-5'>Statement of account </Card.Header>
                {/* <Card.Body className="bg-light"> */}
                    {
                        transactions?.length <= 0 ? (
                            <div className="text-center mt-2">
                                <h5>No Data Found!</h5>
                            </div>
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr className="text-muted">
                                        <th>#</th>
                                        <th>DATETIME</th>
                                        <th>AMOUNT</th>
                                        <th>TYPE</th>
                                        <th>DETAILS</th>
                                        <th>BALANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/* slice(page*5 - 5, page * 5) */}
                                    {
                                        transactions.map((transaction, index)=>(
                                            <tr key={transaction._id}>
                                                <td>{(5 * (page - 1)) + (index + 1)}</td>
                                                <td>{getFormatedTime(transaction?.createdAt)}</td>
                                                <td>{transaction.amount}</td>
                                                <td>{transaction.credit ? 'Credit' : (transaction.debit ? 'Debit' : '')}</td>
                                                <td>{transaction.details}</td>
                                                <td>{transaction.balance}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                    {
                        transactions.length > 0 && <div className="pagination">
                            <span 
                            onClick={()=>selectPageHandler(page - 1)}
                            className={page > 1 ? "" : "pageDisabled"}
                            >
                                ⟨
                            </span>
                            {
                                [...Array(totalPages)].map((_, i)=>{
                                    return (
                                        <span 
                                            className={page === i+1 ? "paginationSelected": ""}
                                            key={i} 
                                            onClick={()=>selectPageHandler(i+1)}
                                        >
                                            {i+1}
                                        </span>
                                    )
                                }) 
                            }
                            <span 
                            onClick={()=>selectPageHandler(page + 1)} 
                            className={page < totalPages ? "" : "pageDisabled"}
                            >
                                    ⟩
                            </span>
                        </div>
                    }
                {/* </Card.Body> */}
            </Card>
        </Container>
    )
}