import React, { Fragment } from 'react';
import UserContactCard from '../../molecules/UserContactCard';
import { useAppSelector } from '../../../redux/hooks';

function ContactUser({ handleMessageUser }: any) {
  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dataUserStore &&
        dataUserStore?.contact.length > 0 &&
        dataUserStore?.contact.map((contact: any) => (
          <Fragment key={`user-${contact.id}`}>
            <UserContactCard
              data={contact}
              handleMessageUser={handleMessageUser}
            />
          </Fragment>
        ))}
    </div>
  );
}

export default ContactUser;
