import React from 'react';
import { Pagination } from 'react-bootstrap';
import { FormGroup,FormLabel,TablePagination,styled} from '@mui/material';

// different paginate components for products, and for admin panel view
const Paginate = ({
	pages,
	page,
	isAdmin = false,
	keyword = '',
	forOrders = false,
	forUsers = false,
}) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((ele) => (
					<Container
						key={ele + 1}
						to={
							isAdmin
								? forOrders
									? `/admin/orderlist/${ele + 1}`
									: forUsers
									? `/admin/userlist/${ele + 1}`
									: `/admin/productlist/${ele + 1}`
								: keyword
								? `/search/${keyword}/page/${ele + 1}`
								: `/page/${ele + 1}`
						}>
						<Pagination.Item active={ele + 1 === Number(page)}>
							{ele + 1}
						</Pagination.Item>
					</Container>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
const Container = styled(FormGroup)`
width: 40%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Spanning =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 .8rem;
`
