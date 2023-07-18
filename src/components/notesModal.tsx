import { Modal, MultiSelect, TextInput, Textarea } from '@mantine/core';
const NotesModal = ({
  openModal,
  setOpenModal,
  tagsData,
  setTagsData,
  noteList,
  setNoteList,
  setNoteId,
  noteId,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  tagsData: { value: string; label: string }[];
  setTagsData: React.Dispatch<
    React.SetStateAction<{ value: string; label: string }[]>
  >;
  noteList: { id: number; title: string; tags: string[]; body: string }[];
  setNoteList: React.Dispatch<
    React.SetStateAction<
      { id: number; title: string; tags: string[]; body: string }[]
    >
  >;
  setNoteId: (value: number | null) => void;
  noteId: number | null;
}) => {
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

    const updatedNote = [
      ...updatedNoteData,
      { id: timestamp, title, tags, body },
    ];
    setNoteList(updatedNote);
    localStorage.setItem('NoteList', JSON.stringify(updatedNote));

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
    setOpenModal(false);
  };
  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => {
          setOpenModal(false);
          setNoteId(null);
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
                // value={value}
                placeholder='type here'
                name='title'
                label='Title'
                // onChange={(e) => setValue(e.currentTarget.value)}
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
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setTagsData((current: { value: string; label: string }[]) => {
                    const updatedData = [...current, item];
                    return updatedData;
                  });
                  return item;
                }}
                className='w-2/4'
                classNames={{ label: 'text-2xl font-normal' }}
              />
            </div>
            <Textarea name='body' minRows={15} className='w-full' />
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
