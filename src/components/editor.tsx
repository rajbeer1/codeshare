import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({ socketRef, roomID ,oncode}) => {
  
  const editorref = useRef(null);
  useEffect (() => {
    async function init() {
      editorref.current=Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: false, 
                }
      );
      const viewportWidth = window.innerWidth;
      const editorWidth = viewportWidth * 0.85;

      editorref.current.setSize(editorWidth, 400);
      editorref.current.on('change', (instance, changes) => {
        const { origin } = changes;
        console.log(origin)
        const code = instance.getValue();
        oncode(code)
    if (origin !== 'setValue' && origin !== 'remote') {
      

        // Save cursor position
        const cursor = instance.getCursor();

        socketRef.current.emit('code-change', {
            roomID,
            code
        });

        // Restore the cursor position after a brief timeout
        setTimeout(() => {
            instance.setCursor(cursor);
        }, 0);
    }
});
    }
    init()
  }, [])
  useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('code-change', ({code}) => {
                if (code !== null) {
                   const cursor = editorref.current.getCursor();
    const scroll = editorref.current.getScrollInfo();

    editorref.current.setValue(code, 'remote');

    editorref.current.setCursor(cursor);
    editorref.current.scrollTo(scroll.left, scroll.top);
                }
            });
        }

        return () => {
            socketRef.current.off('code-change');
        };
    }, [socketRef.current]);
  return (
    <div>
      <textarea id='realtimeEditor' ></textarea>
    </div>
  )
}

export default Editor