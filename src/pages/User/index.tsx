import React, { Suspense, memo, useEffect } from 'react';
import SidebarUser from '../../components/organisms/SidebarUser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_CHILDPAGE, SET_PARENTPAGE } from '../../redux/userSlice';
import Loading from '../../components/atoms/Loading';
import Welcome from './UserComponents/Welcome';

const Contact = React.lazy(() => import('./UserComponents/Contact'));
const Message = React.lazy(() => import('./UserComponents/Message'));

function User() {
  const dispatch = useAppDispatch();
  const { childPage } = useAppSelector((state: any) => {
    return state.userStore;
  });

  useEffect(() => {
    dispatch(
      SET_PARENTPAGE({
        parentPage: 'user',
        parentPageKey: 'user',
        data: {},
      })
    );
    dispatch(
      SET_CHILDPAGE({
        childPage: 'index',
        childPageKey: 'index',
        data: {},
      })
    );
  }, []);

  return (
    <SidebarUser>
      <main>
        <Suspense fallback={<Loading type="xl" />}>
          {childPage === 'index' && <Welcome />}
          {childPage === 'contact' && <Contact />}
          {childPage === 'message' && <Message />}
        </Suspense>
      </main>
    </SidebarUser>
  );
}

export default memo(User);
