import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import LoaderSpinner from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import SearchForm from './SearchForm';

import fetchPic from '../utils/fetchPic';

import { ImgCss } from './Modal/Modal.styled';
import { useState } from 'react';

export function App() {
  //! STATE
  const [querry, setQuerry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState('');
  const [bigImage, setBigImage] = useState('');

  const perPage = 12;

  useEffect(() => {
    if (querry !== '') {
      const fetchData = async () => {
        try {
          setStatus('pending');
          const response = await fetchPic(querry, currentPage, perPage);

          if (response.hits.length === 0) {
            throw new Error('We cannot find this');
          }

          setStatus('resolved');
          setTotal(response.total);
          setData(prevState => {
            return [...prevState, ...response.hits];
          });
        } catch ({ message }) {
          console.log(message);
          setStatus('rejected');
          setError(message);
        }
      };

      // console.log(document.documentElement.scrollHeight);
      // window.scrollTo(0, document.documentElement.scrollHeight);
      
      fetchData();
    }
  }, [querry, currentPage]);

  const handleSubmit = querry => {
    setQuerry(querry);
    setCurrentPage(1);
    setTotal(0);
    setData([]);
    setError('');
    setStatus('idle');
  };

  const togleBigImg = event => {
    event.preventDefault();
    const { target } = event;

    togleModal(event);
    setBigImage(target.getAttribute('data-large-image-url'));
  };

  const togleModal = event => {
    event.preventDefault();

    setShowModal(prevState => !prevState);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleNotifcation = () => {
    setStatus('idle');
    return toast.error(error);
  };

  return (
    <>
      <ToastContainer />
      <Searchbar>
        <SearchForm onSubmit={handleSubmit} />
      </Searchbar>

      {status === 'pending' && <LoaderSpinner />}
      {status === 'rejected' && handleNotifcation()}

      {status === 'resolved' && (
        <ImageGallery images={data} onClick={togleBigImg} />
      )}

      {perPage * currentPage <= total && (
        <Button onClick={loadMore} text={'Load more'} />
      )}

      {showModal && (
        <Modal onClose={togleModal}>
          <ImgCss src={bigImage} alt="" />
        </Modal>
      )}
    </>
  );
}
