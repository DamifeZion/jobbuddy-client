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
   Link,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { BubbleMenu } from "@tiptap/react";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent,
} from "@/components/ui/tooltip";
import { useCallback, useState } from "react";
import { TipTapLinkModal } from "./tiptap-link-modal";
import { Button } from "@/components/ui/button";

const Toolbar = ({ editor }: TiptapToolbarProps) => {
   const [modalIsOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState<string>("");

   const openModal = useCallback(() => {
      if (editor) {
         setUrl(editor.getAttributes("link").href);
         setIsOpen(true);
      }
   }, [editor]);

   const closeModal = useCallback(() => {
      setIsOpen(false);
      setUrl("");
   }, []);

   const saveLink = useCallback(() => {
      if (url && editor) {
         editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url, target: "_blank" })
            .run();
      } else if (editor) {
         editor.chain().focus().extendMarkRange("link").unsetLink().run();
         editor.commands.blur();
      }
      closeModal();
   }, [editor, url, closeModal]);

   const removeLink = useCallback(() => {
      if (editor) {
         editor.chain().focus().extendMarkRange("link").unsetLink().run();
         closeModal();
      }
   }, [editor, closeModal]);

   // Return null if editor is not available
   if (!editor) {
      return null;
   }

   const tiptapButtons = (
      <>
         <TipTapLinkModal
            url={url}
            isOpen={modalIsOpen}
            closeModal={closeModal}
            onChangeUrl={(e) => setUrl(e.target.value)}
            onSaveLink={saveLink}
            onRemoveLink={removeLink}
         />

         {/*=== Heading Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("heading")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
               >
                  <Heading2 className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Heading</TooltipContent>
         </Tooltip>

         {/*=== Bold Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBold().run()
                  }
               >
                  <Bold className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Bold</TooltipContent>
         </Tooltip>

         {/*=== Italic Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleItalic().run()
                  }
               >
                  <Italic className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Italic</TooltipContent>
         </Tooltip>

         {/*=== Underline Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("underline")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleUnderline().run()
                  }
               >
                  <Underline className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Underline</TooltipContent>
         </Tooltip>

         {/*=== StrikeThrough Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleStrike().run()
                  }
               >
                  <Strikethrough className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Strike</TooltipContent>
         </Tooltip>

         {/*=== Link Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("link")}
                  onPressedChange={openModal}
               >
                  <Link className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Link</TooltipContent>
         </Tooltip>

         {/*=== Unordered List Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBulletList().run()
                  }
               >
                  <List className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Unordered List</TooltipContent>
         </Tooltip>

         {/*=== OrderedList Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleOrderedList().run()
                  }
               >
                  <ListOrdered className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Ordered List</TooltipContent>
         </Tooltip>

         {/*=== Blockquote Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("blockquote")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBlockquote().run()
                  }
               >
                  <Quote className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Blockquote</TooltipContent>
         </Tooltip>

         {/*=== Code Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("code")}
                  onPressedChange={() => editor.chain().focus().setCode().run()}
               >
                  <Code className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Code</TooltipContent>
         </Tooltip>

         {/*=== Undo Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("undo")}
                  onPressedChange={() => editor.chain().focus().undo().run()}
               >
                  <Undo className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Undo</TooltipContent>
         </Tooltip>

         {/*=== Redo Button ===*/}
         <Tooltip>
            <TooltipTrigger asChild>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("redo")}
                  onPressedChange={() => editor.chain().focus().redo().run()}
               >
                  <Redo className="size-4" />
               </Toggle>
            </TooltipTrigger>

            <TooltipContent>Redo</TooltipContent>
         </Tooltip>
      </>
   );

   return (
      <div className="p-1.5 flex items-center gap-1 border border-input bg-transparent rounded-md">
         {tiptapButtons}

         <BubbleMenu
            pluginKey="bubbleMenuLink"
            className="p-2 flex items-center gap-2 bg-secondary rounded-lg"
            tippyOptions={{ duration: 150 }}
            editor={editor}
            shouldShow={({ editor, from, to }) => {
               // only show the bubble menu for links.
               return from === to && editor.isActive("link");
            }}
         >
            <Button size="sm" onClick={openModal}>
               Edit
            </Button>

            <Button
               size="sm"
               className="text-destructive-foreground bg-destructive"
               onClick={removeLink}
            >
               Remove
            </Button>
         </BubbleMenu>
      </div>
   );
};

export default Toolbar;
