'use client';

import { useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

interface NoteItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'todo';
  items?: NoteItem[];
  date: number;
}

export default function Notes() {
  const { isMobileOrTablet } = useResponsive();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('hanifos_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      const defaultNote: Note = {
        id: 'welcome-note',
        title: 'Welcome to Notes',
        content: 'This is your iOS-style notes app. You can add text notes or to-do lists.',
        type: 'note',
        date: Date.now(),
      };
      setNotes([defaultNote]);
      setActiveNoteId('welcome-note');
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('hanifos_notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (type: 'note' | 'todo') => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: type === 'note' ? 'New Note' : 'New To-Do List',
      content: '',
      type,
      items: type === 'todo' ? [{ id: `item-${Date.now()}`, text: '', completed: false }] : [],
      date: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    if (activeNoteId === id) {
      setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  const updateNote = (id: string, fields: Partial<Note>) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...fields } : n)));
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const NoteList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => setActiveNoteId(note.id)}
          style={{
            padding: '12px 16px',
            backgroundColor: activeNoteId === note.id ? 'rgba(0, 255, 159, 0.1)' : 'transparent',
            borderBottom: '1px solid #2d3748',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#e6edf3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {note.title || 'Untitled'}
            </span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>
              {note.type === 'todo' ? '☑️' : '📝'}
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 4 }}>
            {note.type === 'note' ? note.content : `${note.items?.length} items`}
          </div>
        </div>
      ))}
    </div>
  );

  const NoteEditor = () => {
    if (!activeNote) {
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Select a note or create a new one
        </div>
      );
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 16 }}>
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
          placeholder="Note Title"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#00ff9f',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            marginBottom: 20,
            width: '100%',
          }}
        />

        {activeNote.type === 'note' ? (
          <textarea
            value={activeNote.content}
            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
            placeholder="Start writing..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e6edf3',
              fontSize: 16,
              lineHeight: 1.6,
              resize: 'none',
              width: '100%',
            }}
          />
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {activeNote.items?.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => {
                    const newItems = [...(activeNote.items || [])];
                    newItems[idx].completed = e.target.checked;
                    updateNote(activeNote.id, { items: newItems });
                  }}
                  style={{ width: 20, height: 20, accentColor: '#00ff9f' }}
                />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const newItems = [...(activeNote.items || [])];
                    newItems[idx].text = e.target.value;
                    updateNote(activeNote.id, { items: newItems });
                  }}
                  placeholder="Task description"
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: item.completed ? '#6b7280' : '#e6edf3',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    fontSize: 16,
                  }}
                />
                <button
                  onClick={() => {
                    const newItems = activeNote.items?.filter((_, i) => i !== idx);
                    updateNote(activeNote.id, { items: newItems });
                  }}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', fontSize: 18, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [...(activeNote.items || []), { id: `item-${Date.now()}`, text: '', completed: false }];
                updateNote(activeNote.id, { items: newItems });
              }}
              style={{
                marginTop: 16,
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 255, 159, 0.1)',
                color: '#00ff9f',
                border: '1px solid rgba(0, 255, 159, 0.3)',
                borderRadius: 20,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              + Add Item
            </button>
          </div>
        )}

        <div style={{ marginTop: 24, borderTop: '1px solid #2d3748', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => deleteNote(activeNote.id)}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#6b7280', fontSize: 13, cursor: 'pointer' }}
          >
            Delete Note
          </button>
        </div>
      </div>
    );
  };

  const desktopUI = (
    <div style={{ display: 'flex', height: '100%', border: '1px solid #2d3748', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ width: 250, borderRight: '1px solid #2d3748', backgroundColor: '#0f1419', overflowY: 'auto' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #2d3748', display: 'flex', gap: 8 }}>
          <button onClick={() => addNote('note')} style={{ flex: 1, padding: '8px', backgroundColor: '#00ff9f', color: '#0a0e14', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>+ Note</button>
          <button onClick={() => addNote('todo')} style={{ flex: 1, padding: '8px', backgroundColor: '#bd93f9', color: '#0a0e14', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>+ To-Do</button>
        </div>
        <NoteList />
      </div>
      <div style={{ flex: 1, backgroundColor: '#1a1f2e' }}>
        <NoteEditor />
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title={activeNoteId ? (activeNote?.type === 'todo' ? 'To-Do' : 'Note') : 'Notes'} showBack={!!activeNoteId} onBack={() => setActiveNoteId(null)}>
        {!activeNoteId ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <button onClick={() => addNote('note')} style={{ flex: 1, padding: '14px', backgroundColor: '#00ff9f', color: '#0a0e14', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>New Note</button>
              <button onClick={() => addNote('todo')} style={{ flex: 1, padding: '14px', backgroundColor: '#bd93f9', color: '#0a0e14', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>New To-Do</button>
            </div>
            <div style={{ flex: 1, backgroundColor: '#0f1419', borderRadius: 12, overflow: 'hidden', border: '1px solid #2d3748' }}>
              <NoteList />
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', backgroundColor: '#0f1419', borderRadius: 12, border: '1px solid #2d3748' }}>
            <NoteEditor />
          </div>
        )}
      </MobileAppView>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', height: '100%' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>Notes</h2>
      {desktopUI}
    </div>
  );
}
