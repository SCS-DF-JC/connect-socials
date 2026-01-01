# Cursor Jump Fix - Title and Notes Fields

## Problem
Both the **title input field** and the **notes textarea** were experiencing cursor jumping issues when typing. The cursor would reset to the beginning or jump around, making it impossible to edit text normally.

## Root Cause
When users typed in these fields, the onChange handlers immediately called the async `updateDoc` function, which:
1. Updated the database
2. Updated the local state in DataProvider
3. Caused the component to re-render with the new value from state
4. Reset the cursor position in the input field

## Solution
Implemented **local state with debounced updates**:

### 1. Added Local State
Created local state variables that update immediately when the user types:
- `localTitle` - for the title field
- `localNotes` - for the notes field

### 2. Debounced Database Updates
Used `setTimeout` with a 500ms debounce to delay database updates until the user stops typing. This prevents constant re-renders during active typing.

### 3. Separated Local State Sync
Added a separate `useEffect` that only syncs local state when switching documents (based on `doc?.id`), not on every content change.

## Technical Changes

### DocsView.tsx
**Added:**
```typescript
// Local state for editing
const [localTitle, setLocalTitle] = useState("");
const [localNotes, setLocalNotes] = useState("");
const titleUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const notesUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

// Sync local state when doc changes
useEffect(() => {
  if (selectedDoc) {
    setLocalTitle(selectedDoc.title);
    setLocalNotes(selectedDoc.notes || "");
  }
}, [selectedDoc?.id]); // Only update when switching docs

// Debounced title update
const handleUpdateTitle = useCallback((title: string) => {
  setLocalTitle(title); // Update local state immediately
  
  if (titleUpdateTimeoutRef.current) {
    clearTimeout(titleUpdateTimeoutRef.current);
  }
  
  titleUpdateTimeoutRef.current = setTimeout(() => {
    if (selectedDocId) {
      updateDoc(selectedDocId, { title });
    }
  }, 500); // 500ms debounce
}, [selectedDocId, updateDoc]);

// Similar for handleUpdateNotes
```

### DocsEditor.tsx
**Added `localTitle` prop:**
```typescript
interface DocsEditorProps {
  doc: DocPage | null;
  localTitle: string; // NEW
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
}

// Use localTitle instead of doc.title
<Input
  value={localTitle} // Changed from doc.title
  onChange={(e) => onUpdateTitle(e.target.value)}
  ...
/>
```

### DocsMetadataPanel.tsx
**Added `localNotes` prop:**
```typescript
interface DocsMetadataPanelProps {
  doc: DocPage | null;
  localNotes: string; // NEW
  onUpdateTags: (tags: DocTag[]) => void;
  onUpdateNotes: (notes: string) => void;
  onDeleteDoc?: () => void;
}

// Use localNotes instead of doc.notes
<Textarea
  value={localNotes} // Changed from doc.notes || ""
  onChange={(e) => onUpdateNotes(e.target.value)}
  ...
/>
```

## How It Works

### Typing Flow
1. **User types** in title field → `onChange` fires
2. **Local state updates immediately** → `setLocalTitle("new value")`
3. **Input re-renders** with local state (cursor preserved ✅)
4. **Timer starts** → 500ms countdown
5. **User continues typing** → Timer resets, local state updates
6. **User stops typing** → Timer completes after 500ms
7. **Database updates** → `updateDoc` called with final value
8. **State updates** → DataProvider updates docs array
9. **Component re-renders** → Local state already matches, no cursor jump ✅

### Document Switching Flow
1. **User selects different doc** → `selectedDoc` changes
2. **useEffect fires** (because `doc?.id` changed)
3. **Local state syncs** → Sets `localTitle` and `localNotes` from new doc
4. **Fields update** with new document's values

## Key Benefits

1. **Instant feedback**: Users see their changes immediately in local state
2. **No cursor jumps**: Input components controlled by local state only
3. **Debounced saves**: Reduces database calls (only save after 500ms of no typing)
4. **Better UX**: Smooth typing experience
5. **Data integrity**: All changes still saved to database

## Files Modified

1. `src/planner_section/views/DocsView.tsx`
   - Added local state for title and notes
   - Added debounced update handlers
   - Added useEffect for syncing local state on doc change
   - Pass localTitle to DocsEditor
   - Pass localNotes to DocsMetadataPanel

2. `src/planner_section/docs/DocsEditor.tsx`
   - Added `localTitle` prop to interface
   - Updated Input to use `localTitle` instead of `doc.title`

3. `src/planner_section/docs/DocsMetadataPanel.tsx`
   - Added `localNotes` prop to interface
   - Updated Textarea to use `localNotes` instead of `doc.notes`

## Testing Checklist

- [ ] Type in title field - cursor should stay in place
- [ ] Type in notes field - cursor should stay in place  
- [ ] Switch between documents - fields should update correctly
- [ ] Wait 500ms after typing - changes should save to database
- [ ] Refresh page - changes should persist
- [ ] Edit title and notes simultaneously - both should work independently

## Performance Notes

- **Reduced database calls**: Instead of updating on every keystroke, we batch updates (500ms debounce)
- **Reduced re-renders**: Components only re-render from local state changes, not database updates
- **Better responsiveness**: UI feels instant because local state updates immediately

## Troubleshooting

### Still seeing cursor jumps
1. Clear browser cache and hard refresh
2. Check that both `localTitle` and `localNotes` are being passed correctly
3. Verify the debounce timeout is being cleared properly

### Changes not saving
1. Check browser console for errors
2. Verify the debounce timeout (500ms) is completing
3. Check network tab to confirm PATCH requests are being sent
