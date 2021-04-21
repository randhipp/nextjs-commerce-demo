import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import Router, { useRouter, withRouter } from "next/router" 
import Link from 'next/link'
import superagent from 'superagent'

import styles from '../../styles/Pagination.module.scss'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const PhoneList = (props) => {
  // console.log(props)
  const [ isLoading, setIsLoading ] = useState(false)
  // const [ phones, setPhones ] = useState([])
  // const router = useRouter()

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  useEffect(() => {
    // Router event handler
    // setPhones(data.phones)
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)
    return () => {
      // setPhones(data.phones)
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])

  // Triggers fetch for new page
  const pagginationHandler = (page) => {
    // console.log(page)
    // console.log(props)
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
        pathname: currentPath,
        query: currentQuery,
    });

};

console.log(props)

let content = null;

if(isLoading) {
  content = <div>Loading...</div>;
} else {
  content = (
    <ul className="user-list">
      test
      {/* {phones.map((phone, i) => {
        return (
          <li className="user" key={i}>
            <Link href={`/phones/${encodeURIComponent(phone.slug)}`}>
              <a>{phone.name}</a>
            </Link>
          </li>
        )
      })
    } */}
      {/* {props.phones.length > 0 &&
      props.phones.map((phone, i) => {
        return (
          <li className="user" key={i}>
            <Link href={`/phones/${encodeURIComponent(phone.slug)}`}>
              <a>{phone.name}</a>
            </Link>
          </li>
        )
      })} */}
  </ul>
  )
}


  return (
    <>
      {isLoading && <h1>Loading..</h1>}
      <div className="links">
          {content}
      </div>
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={props.currentPage - 1}
        pageCount={props.pageCount} //page count
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={pagginationHandler}
        containerClassName={styles["paginate-wrap"]}
        subContainerClassName={styles["paginate-inner"]}
        pageClassName={styles["paginate-li"]}
        pageLinkClassName={styles["paginate-a"]}
        activeClassName={styles["paginate-active"]}
        nextLinkClassName={styles["paginate-next-a"]}
        previousLinkClassName={styles["paginate-prev-a"]}
        breakLinkClassName={styles["paginate-break-a"]}
      />
    </>
  )
}

PhoneList.getInitialProps = async ({ query }) => {
  console.log(phones)
  const page = query.page || 1;
  // const phones = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`);
  const body = await superagent.get(`${apiBaseUrl}/phones?page=${page}`)
  console.log(body);
  return {
      totalCount: body._meta.totalCount,
      pageCount: body._meta.pageCount,
      currentPage: body._meta.currentPage,
      perPage: body._meta.perPage,
      propphones: body.phones,
      isLoading: false,
  };
}

export default withRouter(PhoneList)