import React, { useState, useEffect, useRef } from "react"
import ReactPaginate from "react-paginate"
import Router, { useRouter } from "next/router"

import PuffLoader from "react-spinners/PuffLoader";

import styles from '../../styles/Pagination.module.scss'

import PhoneCard from '../PhoneCard'


const PhoneList = (props) => {
  const { phones, meta } = props
  const router = useRouter()
  const phoneListRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = async () => {
    // const currentQuery = router.query;
    await new Promise(r => setTimeout(r, 500));
    setIsLoading(false)


  }

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
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    }).then(() => {
      if (phoneListRef.current && currentQuery.page > 1)
        phoneListRef.current.scrollIntoView({ behavior: "smooth" })
    })

  };

  return (
    <>
      <div className="p-30 m-30 flex justify-center justify-self-center">
        <PuffLoader className="m-auto p-auto" color="pink" loading={isLoading} size={100} />
      </div>
      <div className="w-full px-5">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:gap-3" name="phoneList" ref={phoneListRef}>
          {!isLoading &&
            phones.map((phone, i) => {
              return (
                <div key={i}>
                  <PhoneCard
                    phone={phone}
                    href={`/phones/${encodeURIComponent(phone.slug)}`}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        initialPage={meta.currentPage - 1}
        pageCount={meta.pageCount} //page count
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

// PhoneList.getStaticProps = async ({query}) => {
//   const page = query.page || 1;
//   const {body} = await superagent.get(`${apiBaseUrl}/phones?page=${page}`)
//   return {
//     totalCount: body._meta.totalCount,
//     pageCount: body._meta.pageCount,
//     currentPage: body._meta.currentPage,
//     perPage: body._meta.perPage,
//     phones: body.phones,
//     isLoading: false,
//   };
// }

export default PhoneList