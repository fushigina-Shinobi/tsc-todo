import './index.css';
import TodoLayout from './components/todoLayout';
import { useEffect, useState } from 'react';
import NotesModal from './components/notesModal';
function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [noteId, setNoteId] = useState<number | null>(null);
  const [tagsData, setTagsData] = useState<{ value: string; label: string }[]>(
    []
  );
  const [noteList, setNoteList] = useState<
    { id: number; title: string; tags: string[]; body: string }[]
  >([]);

  const NoteData = localStorage.getItem('NoteList');
  const existingData = localStorage.getItem('TagList');
  useEffect(() => {
    //notes list
    let updatedNoteData = [] as {
      id: number;
      title: string;
      tags: string[];
      body: string;
    }[];
    if (NoteData) {
      updatedNoteData = JSON.parse(NoteData);
    }
    setNoteList(updatedNoteData);

    //tags list
    let updatedData = [] as { value: string; label: string }[];
    if (existingData) {
      updatedData = JSON.parse(existingData);
    }
    setTagsData(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(NoteData), JSON.stringify(existingData)]);

  return (
    <div className='h-full w-full'>
      <div className='flex flex-col justify-center gap-y-8 my-10'>
        <div className='flex justify-evenly pr-16'>
          <h1 className='text-4xl text-primary'>Papyrus Planner</h1>
          <div className='flex gap-x-4'>
            <button
              className='px-10 py-4  hover:bg-tertiary bg-primary text-offWhite rounded-lg'
              onClick={() => setOpenModal(true)}
            >
              Create
            </button>
            <button className='px-8 py-4 bg-secondary hover:bg-tertiary text-offWhite rounded-lg'>
              Edit Tags
            </button>
          </div>
        </div>
        <div className='self-center'>
          <TodoLayout
            value={value}
            setValue={setValue}
            tagsData={tagsData}
            setTagsData={setTagsData}
            noteList={noteList}
            setNoteList={setNoteList}
            setOpenModal={setOpenModal}
            setNoteId={setNoteId}
            noteId={noteId}
          />
        </div>
      </div>
      <NotesModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        tagsData={tagsData}
        setTagsData={setTagsData}
        noteList={noteList}
        setNoteList={setNoteList}
        setNoteId={setNoteId}
        noteId={noteId}
        value={value}
        setValue={setValue}
        body={body}
        setBody={setBody}
      />
    </div>
  );
}

export default App;
