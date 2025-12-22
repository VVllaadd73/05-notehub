// src/App/App

import SearchBox from '../SearchBox/SearchBox';
import Paginate from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';

import { fetchNotes } from '../../services/noteService';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import css from './App.module.css';

export default function App() {
   const [onQuery, setOnQuery] = useState('');
   const [page, setPage] = useState(1);
   const [modalOpen, setModalOpen] = useState(false);

   const closeModal = () => setModalOpen(false);
   const openModal = () => setModalOpen(true);

const { data, isSuccess, isLoading, isError } = useQuery({
   queryKey: ['note', page, onQuery],
   queryFn: () => fetchNotes(page, onQuery),
   placeholderData: keepPreviousData,
});
   const totalPages = data?.totalPages;

   const onFound = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setOnQuery(e?.target.value);
         setPage(1);
      },
      250
   );

   return (
      <div className={css.app}>
         <header className={css.toolbar}>
            <SearchBox query={onFound} />
            {!!totalPages && totalPages > 1 && (
               <Paginate
                  totalPages={totalPages}
                  currentPage={page}
                  setPage={setPage}
               />
            )}

            <button className={css.button} onClick={() => openModal()}>
               Create note +
            </button>
         </header>

         {isSuccess && data?.notes.length > 0 && (
            <NoteList notes={data.notes} />
         )}

         {isSuccess && data?.notes.length === 0 && (
            <div className={css.statusBox}>
               No notes yet. Create your first note ✨
            </div>
         )}

         {isLoading && <div className={css.statusBox}>Loading notes...</div>}

         {isError && (
            <div className={css.statusBoxError}>
               Something went wrong! Try again
            </div>
         )}
         {modalOpen && (
            <Modal onClose={closeModal}>
               <NoteForm onClose={closeModal} />
            </Modal>
         )}
      </div>
   );
}
