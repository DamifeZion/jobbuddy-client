"use client";

import { TiptapProps } from "@/types";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import "@/app/css/tiptap.css";

const Tiptap = ({ content, onChange }: TiptapProps) => {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Underline,
         Link.configure({
            openOnClick: false,
            autolink: true,
            validate: (href) => /^https?:\/\//.test(href),
         }),
      ],

      content: content,

      editorProps: {
         attributes: {
            // NOTE: We use the textarea default classnames.
            class: "tiptap-wysiwag-editor min-h-[180px] max-h-[250px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
         },
      },

      onUpdate({ editor }) {
         onChange(editor.getHTML());
      },
   });

   return (
      <div className="w-full space-y-2 ">
         <Toolbar editor={editor} />
         <EditorContent editor={editor} />
      </div>
   );
};

export default Tiptap;
