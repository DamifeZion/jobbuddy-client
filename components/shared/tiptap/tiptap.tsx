"use client";

import { TiptapProps } from "@/types";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";

const Tiptap = ({ content, onChange }: TiptapProps) => {
   const editor = useEditor({
      extensions: [
         StarterKit.configure({}),
         Underline,
         OrderedList,
         BulletList,
         Heading.configure({
            HTMLAttributes: {
               class: "text-xl font-bold",
               levels: [2],
            },
         }),
      ],

      content: content,

      editorProps: {
         attributes: {
            // NOTE: We use the textarea default classnames.
            class: "min-h-[250px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
         },
      },

      onUpdate({ editor }) {
         onChange(editor.getHTML());
      },
   });

   return (
      <div className="w-full space-y-2">
         <Toolbar editor={editor} />
         <EditorContent editor={editor} />
      </div>
   );
};

export default Tiptap;
