import React, { Fragment } from 'react';
import UserContactCard from '../../molecules/UserContactCard';

function ContactUser({ listContact, handleMessage }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listContact &&
        listContact.length > 0 &&
        listContact.map((contact: any) => (
          <Fragment key={`user-${contact.id}`}>
            <UserContactCard data={contact} handleMessage={handleMessage} />
          </Fragment>
        ))}
    </div>
  );
}

export default ContactUser;
