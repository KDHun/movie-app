import React from "react";
import styles from "./Pagination.module.css";
const Pagination = (props) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    if (props.totalPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => props.handlePageChange(1)}
          className={
            props.currentPage === 1
              ? `${styles.active} ${styles.btn}`
              : styles.btn
          }
        >
          First
        </button>
      );

      for (let i = props.currentPage - 5; i <= props.currentPage + 5; i++) {
        if (i > 0 && i <= props.totalPage) {
          buttons.push(
            <button
              key={i}
              onClick={() => props.handlePageChange(i)}
              className={
                props.currentPage === i
                  ? `${styles.active} ${styles.btn}`
                  : styles.btn
              }
            >
              {i}
            </button>
          );
        }
      }

      buttons.push(
        <button
          key="last"
          onClick={() => props.handlePageChange(props.totalPage)}
          className={
            props.currentPage === props.totalPage
              ? `${styles.active} ${styles.btn}`
              : styles.btn
          }
        >
          Last
        </button>
      );
    }
    return buttons;
  }
  return (
    <div className={styles.PaginationContainer}>{renderPaginationButtons()}</div>
  );
};

export default Pagination;
