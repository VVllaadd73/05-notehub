// src/services/noteService

import axios from 'axios';
import { type Note } from '../types/note';

interface FetchNotesResponse {
   notes: Note[];
   totalPages: number;
}

interface ReplaceNote {
   title: string;
   tag: string;
   content: string;
}

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(onQuery: string, page: number) {
   const response = await axios.get<FetchNotesResponse>('/notes', {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
      params: {
         search: onQuery,
         page: page,
         perPage: 12,
      },
   });
   return response.data;
}

export async function createNote(note: ReplaceNote) {
   const response = await axios.post<Note>('/notes', note, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}

export async function deleteNote(id: string) {
   const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}
