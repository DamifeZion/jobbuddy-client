import { TiptapToolbarProps } from "@/types";
import {
   Bold,
   Strikethrough,
   Italic,
   List,
   ListOrdered,
   Heading2,
   Underline,
   Quote,
   Undo,
   Redo,
   Code,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const Toolbar = ({ editor }: TiptapToolbarProps) => {
   if (!editor) {
      return null;
   }

   return (
      <div className="p-1.5 border border-input bg-transparent rounded-md">
         {/*=== Heading2 Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("heading")}
            onPressedChange={() =>
               editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
         >
            <Heading2 className="size-4" />
         </Toggle>

         {/*=== Bold Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
         >
            <Bold className="size-4" />
         </Toggle>

         {/*=== Italic Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
         >
            <Italic className="size-4" />
         </Toggle>

         {/*=== Underline Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("underline")}
            onPressedChange={() =>
               editor.chain().focus().toggleUnderline().run()
            }
         >
            <Underline className="size-4" />
         </Toggle>

         {/*=== StrikeThrough Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
         >
            <Strikethrough className="size-4" />
         </Toggle>

         {/*=== Unordered List Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
               editor.chain().focus().toggleBulletList().run()
            }
         >
            <List className="size-4" />
         </Toggle>

         {/*=== OrderedList Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
               editor.chain().focus().toggleOrderedList().run()
            }
         >
            <ListOrdered className="size-4" />
         </Toggle>

         {/*=== Blockquote Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
               editor.chain().focus().toggleBlockquote().run()
            }
         >
            <Quote className="size-4" />
         </Toggle>

         {/*=== Code Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().setCode().run()}
         >
            <Code className="size-4" />
         </Toggle>

         {/*=== Undo Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("undo")}
            onPressedChange={() => editor.chain().focus().undo().run()}
         >
            <Undo className="size-4" />
         </Toggle>

         {/*=== Redo Button ===*/}
         <Toggle
            size="sm"
            pressed={editor.isActive("redo")}
            onPressedChange={() => editor.chain().focus().redo().run()}
         >
            <Undo className="size-4" />
         </Toggle>
      </div>
   );
};

export default Toolbar;
