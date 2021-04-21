import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import Router, { withRouter } from "next/router" 
import Link from 'next/link'
import superagent from 'superagent'

import styles from '../styles/Pagination.module.scss'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const PhoneList = (props) => {
  const [ isLoading, setIsLoading ] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  useEffect(() => {
    // Router event handler
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)
    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])

  // Triggers fetch for new page
  const pagginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
        pathname: currentPath,
        query: currentQuery,
    });

};

let content = null;
if(isLoading) {
  content = <div>Loading...</div>;
} else {
  content = (
    <ul className="user-list">
      {props.phones.map((phone, i) => {
          return (
            <li className="user" key={i}>
              <Link href={`/phones/${encodeURIComponent(phone.slug)}`}>
                <a>{phone.name}</a>
              </Link>
            </li>
          )
        })
      }
  </ul>
  )
}


  return (
    <>
      {isLoading && <h1>Loading..</h1>}
      {!isLoading && (
        <div className="links">
          {content}
        </div>
      )}
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
  const page = query.page || 1;
  const { body } = await superagent.get(`${apiBaseUrl}/phones?page=${page}`)
  return {
      totalCount: body._meta.totalCount,
      pageCount: body._meta.pageCount,
      currentPage: body._meta.currentPage,
      perPage: body._meta.perPage,
      phones: body.phones,
      isLoading: false,
  };
}

export default withRouter(PhoneList)