import { Modal, MultiSelect, TextInput, Textarea } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeModal } from '../features/modal/modalSlice';
import { AppDispatch, RootState } from '../store';
import { setNoteList } from '../features/todo/todoSlice';
const NotesModal = ({
  tagsData,
  setTagsData,
  setNoteId,
  noteId,
  setValue,
  value,
  body,
  setBody,
}: {
  value: string;
  setValue: (value: string) => void;
  body: string;
  setBody: (value: string) => void;
  tagsData: { value: string; label: string }[];
  setTagsData: React.Dispatch<
    React.SetStateAction<{ value: string; label: string }[]>
  >;
  setNoteId: (value: number | null) => void;
  noteId: number | null;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.modal);

  // function to handle the submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const tagsString = formData.get('tags') as string; // Get the comma-separated string of tags
    const tags = tagsString.split(',').map((tag) => tag.trim()); // Split the string into an array of tags
    const timestamp = Date.now();
    //notes list
    const NoteData = localStorage.getItem('NoteList');
    let updatedNoteData = [];

    if (NoteData) {
      updatedNoteData = JSON.parse(NoteData);
    }
    let updatedNote = [];
    if (noteId) {
      const editNote = updatedNoteData?.map(
        (note: { id: number; title: string; tags: string[]; body: string }) => {
          if (note?.id === noteId) {
            return { ...note, title, tags, body };
          }
          return note;
        }
      );
      dispatch(setNoteList(editNote));
      localStorage.setItem('NoteList', JSON.stringify(editNote));
    } else {
      updatedNote = [...updatedNoteData, { id: timestamp, title, tags, body }];
      dispatch(setNoteList(updatedNote));
      localStorage.setItem('NoteList', JSON.stringify(updatedNote));
    }

    //tags list
    const existingData = localStorage.getItem('TagList');
    let updatedData = [];

    if (existingData) {
      updatedData = JSON.parse(existingData);
    }

    const getTags = [...updatedData, ...tags];
    const updatedTags = Array.from(new Set(getTags));
    setTagsData(updatedTags);
    localStorage.setItem('TagList', JSON.stringify(updatedTags));

    // Clear the form fields if neededs
    // setValue('');
    // setData([]);

    // Close the modal if needed
    setNoteId(null);
    dispatch(closeModal());
  };

  useEffect(() => {
    const NoteData = localStorage.getItem('NoteList');
    let updatedNoteData = [] as {
      id: number;
      title: string;
      tags: string[];
      body: string;
    }[];
    if (NoteData) {
      updatedNoteData = JSON.parse(NoteData);
    }
    const existingData = localStorage.getItem('TagList');
    let updatedData = [];

    if (existingData) {
      updatedData = JSON.parse(existingData);
    }

    const getTags = [...updatedData];
    if (noteId && updatedNoteData) {
      console.log(getTags, 'gettags');
      updatedNoteData?.filter((note) => {
        if (note?.id === noteId) {
          setTagsData(note?.tags.map((tag) => ({ value: tag, label: tag })));
          setValue(note?.title);
          setBody(note?.body);
        }
        return note;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => {
          const existingData = localStorage.getItem('TagList');
          dispatch(closeModal());
          setNoteId(null);
          //tags list
          let updatedData = [] as { value: string; label: string }[];
          if (existingData) {
            updatedData = JSON.parse(existingData);
          }
          setTagsData(updatedData);
          setValue('');
          setBody('');
        }}
        title='Create Notes'
        centered
        size='xl'
        classNames={{ title: 'text-2xl' }}
      >
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-6 justify-center items-center mb-6'>
            <div className='flex gap-x-6 items-center w-full'>
              <TextInput
                defaultValue={value}
                placeholder='type here'
                name='title'
                label='Title'
                className='w-2/4'
                classNames={{ label: 'text-2xl font-normal' }}
              />

              <MultiSelect
                data={tagsData}
                name='tags'
                placeholder='create or search tags'
                label='Tags'
                searchable
                creatable
                defaultValue={tagsData.map((item) => item.value)}
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setTagsData((current: { value: string; label: string }[]) => {
                    const updatedData = [...current, item];
                    return updatedData;
                  });
                  return item;
                }}
                // onChange={(e) => setTagsData(e.values)}
                className='w-2/4'
                classNames={{ label: 'text-2xl font-normal' }}
              />
            </div>
            <Textarea
              name='body'
              minRows={15}
              className='w-full'
              defaultValue={body}
            />
          </div>
          <div className='flex justify-center items-center'>
            <button
              type='submit'
              className='px-10 py-4   hover:bg-tertiary bg-primary text-offWhite rounded-lg'
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NotesModal;
