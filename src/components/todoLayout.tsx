import { MultiSelect, TextInput } from '@mantine/core';
import NoData from '../assets/no_data.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { openModal } from '../features/modal/modalSlice';
export default function TodoLayout({
  value,
  setValue,
  tagsData,
  setNoteId,
}: {
  value: string;
  setValue: (value: string) => void;
  tagsData: { value: string; label: string }[];
  setNoteId: (value: number | null) => void;
}) {
  const noteList = useSelector((store: RootState) => store.notes);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className='flex flex-col gap-y-10 justify-center items-center'>
      <div className='flex gap-x-6 w-full ml-12'>
        <TextInput
          value={value}
          placeholder='search title'
          label='Title'
          // onChange={(e: string) => setValue(e.currentTarget.value as string)}
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
      <div
        className='grid gap-y-10 grid-cols-fluid'
        // className={`${
        //   noteList?.length
        //     ? 'grid gap-y-10 grid-cols-fluid'
        //     : 'flex justify-center items-center'
        // }`}
      >
        {noteList?.length ? (
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
              <button
                onClick={() => {
                  dispatch(openModal());
                  setNoteId(note?.id);
                }}
              >
                <span>Learn more</span>
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
          <img src={NoData} alt='data not found' />
        )}
      </div>
    </div>
  );
}
