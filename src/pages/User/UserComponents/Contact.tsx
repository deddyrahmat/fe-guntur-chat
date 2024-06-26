import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ContactUser from '../../../components/organisms/ContactUser';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SET_CHILDPAGE } from '../../../redux/userSlice';

import ApiUser from '../../../config/Endpoints/users';
import Loading from '../../../components/atoms/Loading';

function Contact() {
  const dispatch = useAppDispatch();

  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });

  const handleMessageUser = (
    emailParam: string,
    usernameParam: string,
    statusParam: boolean
  ) => {
    dispatch(
      SET_CHILDPAGE({
        childPage: 'message',
        childPageKey: 'message',
        data: {
          email: emailParam,
          username: usernameParam,
          status: statusParam,
        },
      })
    );
  };

  const [isFocused, setIsFocused] = useState(false);

  const [allUsers, setAllUsers] = useState<any>([]);
  const [resultUser, setResultUser] = useState<any>([]);
  const [totalUser, setTotalUser] = useState(0);

  const [page, setPage] = useState(1);
  // urutan data yang ditampilkan
  const [pageSize, setPageSize] = useState(4);
  // total data yang ditampilkan
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);

  const fetchUsers = async (
    pKeyword: string,
    pPage: number,
    pPageSize: number
  ) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const res = await ApiUser.searchUsers(config, pKeyword, pPage, pPageSize);
      if (res?.data) {
        setResultUser(res.data[0]);
        // setResultUser((prev: any) => [...prev, ...res.data[0]]);
        setTotalUser(res.data[1]);
        if (res.data[0].length === 0) {
          toast.warning('Contact tidak tersedia');
        }
        if (res.data[1].length < 5) {
          setLoadMore(false);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.message ||
          'Terjadi kegagalan server. Silahkan coba kembali beberapa saat lagi'
      );
    }
  };

  useEffect(() => {
    if (page === 1) {
      // Jika ini adalah halaman pertama, set langsung dengan resultUser
      setAllUsers(resultUser);
      dispatch(
        SET_CHILDPAGE({
          childPage: 'contact',
          childPageKey: 'contact',
          data: {
            list: resultUser,
            total: totalUser,
          },
        })
      );
    } else if (resultUser?.length > 0 && page > 1) {
      // Jika ini adalah halaman berikutnya, gabungkan data lama dengan yang baru tanpa duplikasi
      const newUsers = resultUser.filter(
        (newUser: any) =>
          !allUsers.some((existingUser: any) => existingUser.id === newUser.id)
      );
      const updatedUsers = [...allUsers, ...newUsers];
      setAllUsers(updatedUsers); // Update state allUsers terlebih dahulu
      dispatch(
        SET_CHILDPAGE({
          childPage: 'contact',
          childPageKey: 'contact',
          data: {
            list: updatedUsers,
            total: totalUser,
          },
        })
      );
    }
  }, [resultUser, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Eksekusi pencarian setelah penundaan
      if (keyword !== '') {
        fetchUsers(keyword, page, pageSize);
      } else {
        fetchUsers(',', page, pageSize);
      }
    }, 1000);

    // Membersihkan timeout sebelum mengatur yang baru
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]); // Memantau perubahan keyword

  const handleChange = (event: any) => {
    setKeyword(event.target.value);
    // ubah page dari awal lagi
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setPageSize(pageSize);

    if (keyword !== '') {
      fetchUsers(keyword, page + 1, pageSize);
    } else {
      fetchUsers(',', page + 1, pageSize);
    }
  };

  const removeKeyword = () => {
    setKeyword('');
    dispatch(
      SET_CHILDPAGE({
        childPage: 'contact',
        childPageKey: 'contact',
        data: { list: [], total: [] },
      })
    );
    fetchUsers(',', 1, pageSize);
  };
  return (
    <>
      <h2 className="mb-5 text-lg md:text-xl font-bold bg-white p-3 rounded-lg md:rounded-xl">
        Contact
      </h2>
      <div
        className={`w-6/12 flex items-center ml-auto ps-2.5 p-2 mb-8 gap-3 bg-white rounded-lg md:rounded-xl ${
          isFocused
            ? 'border-primary-100 ring-2 ring-primary-100 ring-opacity-50 z-10 transition-colors duration-300 ease-in-out shadow-outline '
            : ''
        }`}
      >
        <input
          type="text"
          name="search"
          value={keyword}
          placeholder="Search User..."
          className="w-11/12 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
        />

        <button type="button" onClick={() => removeKeyword()}>
          <img
            src="/assets/icons/icon-close.svg"
            alt="icon-close"
            className="h-5 w-5"
          />
        </button>
      </div>
      {loadMore && isLoading === false ? (
        <>
          <ContactUser handleMessageUser={handleMessageUser} />
          {/* resultUser &&
            totalUser && */}
          {dataUserStore?.contact?.list?.length > 0 &&
            dataUserStore?.contact?.list?.length < totalUser && (
              <>
                <p className="italic mt-5">
                  Untuk menunjukkan hasil yang paling relevan untuk Anda,
                  silahkan gunakan fitur pencarian
                </p>
                <section className="flex justify-center items-center mt-3">
                  <button
                    type="button"
                    className="bg-primary py-2 px-4 text-white dark:text-black rounded-lg md:rounded-xl hover:bg-primary-500 hover:text-primary-900 "
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                </section>
              </>
            )}
        </>
      ) : (
        <Loading type="auto" bg="transparent" />
      )}
    </>
  );
}

export default Contact;
