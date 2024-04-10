import React from 'react';
import PropTypes from 'prop-types';
import { CPagination, CPaginationItem } from '@coreui/react';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const renderPaginationItems = () => {
    const items = [];
    const maxButtons = 5; // 한 번에 보여줄 최대 버튼 수
    const halfMaxButtons = Math.floor(maxButtons / 2);

    // 현재 페이지를 중심으로 앞뒤로 최대 maxButtons/2 개씩 버튼을 표시합니다.
    let start = Math.max(1, currentPage - halfMaxButtons);
    let end = Math.min(totalPages, start + maxButtons - 1);

    // 만약 현재 페이지가 처음 페이지 근처에 위치해 있을 경우,
    // 시작 페이지를 1로 설정하고 끝 페이지를 maxButtons 개로 설정합니다.
    if (currentPage <= halfMaxButtons) {
      start = 1;
      end = Math.min(totalPages, maxButtons);
    }
    // 만약 현재 페이지가 마지막 페이지 근처에 위치해 있을 경우,
    // 시작 페이지를 totalPages - maxButtons + 1로 설정하고 끝 페이지를 totalPages로 설정합니다.
    else if (currentPage >= totalPages - halfMaxButtons) {
      start = Math.max(1, totalPages - maxButtons + 1);
      end = totalPages;
    }

    // 페이지 버튼을 생성합니다.
    for (let i = start; i <= end; i++) {
      items.push(
        <CPaginationItem key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
          {i}
        </CPaginationItem>
      );
    }
    return items;
  };

  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem aria-label="Previous" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {renderPaginationItems()}
      <CPaginationItem aria-label="Next" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
