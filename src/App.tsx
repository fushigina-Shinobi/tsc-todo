import './index.css';
import TodoLayout from './components/todoLayout';
import { useEffect, useState } from 'react';
import NotesModal from './components/notesModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { openModal } from './features/modal/modalSlice';
import { setNoteList } from './features/todo/todoSlice';
function App() {
  const [value, setValue] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [noteId, setNoteId] = useState<number | null>(null);
  const [tagsData, setTagsData] = useState<{ value: string; label: string }[]>(
    []
  );
  // const [noteList, setNoteList] = useState<
  //   { id: number; title: string; tags: string[]; body: string }[]
  // >([]);
  const dispatch: AppDispatch = useDispatch();

  const NoteData = localStorage.getItem('NoteList');
  const existingData = localStorage.getItem('TagList');
  useEffect(() => {
    //notes list
    let updatedNoteData = [];
    if (NoteData) {
      updatedNoteData = JSON.parse(NoteData);
    }
    dispatch(setNoteList(updatedNoteData));

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
              onClick={() => dispatch(openModal())}
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
            setNoteId={setNoteId}
          />
        </div>
      </div>
      <NotesModal
        tagsData={tagsData}
        setTagsData={setTagsData}
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
