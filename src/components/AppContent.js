import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes , useNavigate} from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
// routes config
import routes from '../routes'
import { isAuthenticated } from '../common/utils'




const AppContent = () => {
  const navigate = useNavigate();
  // 뒤로가기 이벤트 감지
  useEffect(() => {
   // const handleBackButton = () => {
      if (!isAuthenticated()) {
        // 로그아웃 상태라면 로그인 페이지로 이동
        navigate('/login');
      }
    // };

    // window.addEventListener('popstate', handleBackButton);

    // return () => {
    //   window.removeEventListener('popstate', handleBackButton);
    // };
  }, [navigate]);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
