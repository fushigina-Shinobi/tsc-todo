import { MultiSelect, TextInput } from '@mantine/core';
import React, { Dispatch } from 'react';
export default function TodoLayout({
  value,
  setValue,
  tagsData,
  setTagsData,
  noteList,
  setNoteList,
  setOpenModal,
  setNoteId,
  noteId,
}: {
  value: string;
  setValue: (value: string) => void;
  tagsData: { value: string; label: string }[];
  setTagsData: Dispatch<{ value: string; label: string }[]>;
  noteList: { id: number; title: string; tags: string[]; body: string }[];
  setNoteList: React.Dispatch<
    React.SetStateAction<
      { id: number; title: string; tags: string[]; body: string }[]
    >
  >;
  setOpenModal: (value: boolean) => void;
  setNoteId: (value: number | null) => void;
  noteId: number | null;
}) {
  return (
    <div className='flex flex-col gap-y-10 justify-center items-center'>
      <div className='flex gap-x-6 w-full ml-12'>
        <TextInput
          value={value}
          placeholder='search title'
          label='Title'
          onChange={(e) => setValue(e.currentTarget.value)}
          className='w-[44%]'
          classNames={{ label: 'text-2xl font-normal', input: 'text-lg h-10' }}
        />
        <MultiSelect
          placeholder='search tags'
          label='Tags'
          searchable
          clearable
          className='w-[44%]'
          classNames={{
            label: 'text-2xl font-normal',
            searchInput: 'text-lg',
            input: 'h-10',
          }}
          data={tagsData}
        />
      </div>
      <div className='grid gap-y-10 grid-cols-fluid'>
        {noteList ? (
          noteList?.map((note) => (
            <div className='category-card' key={note?.id}>
              <div className='content  overflow-hidden'>
                <h2 className='!text-primary'>{note?.title}</h2>
                {note?.tags?.map((tag: string, i) => (
                  <span className='tag !bg-secondary' key={i}>
                    {tag}
                  </span>
                ))}
                <p className='text-ellipsis'>{note.body}</p>
              </div>
              <button>
                <span
                  onClick={() => {
                    setOpenModal(true);
                    setNoteId(note?.id);
                  }}
                >
                  Learn more
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill='none'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path
                    d='M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <img src='../assets/no_data.png' alt='data not found' />
        )}
      </div>
    </div>
  );
}
