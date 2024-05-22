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
import { TipTapLinkModal } from "./link-modal";
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

   return (
      <div className="p-1.5 flex flex-wrap items-center gap-1 border border-input bg-transparent rounded-md">
         <TipTapLinkModal
            url={url}
            isOpen={modalIsOpen}
            closeModal={closeModal}
            onChangeUrl={(e) => setUrl(e.target.value)}
            onSaveLink={saveLink}
            onRemoveLink={removeLink}
         />

         {/* The Bubble menu with all the tooltip is conflicting and thrwoing a removeChild error. */}
         {/* 
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
         </BubbleMenu> */}

         <>
            {/*=== Heading Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("heading")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Heading2 className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">Heading</TooltipContent>
            </Tooltip>

            {/*=== Bold Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBold().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Bold className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Bold <br /> Cmd + B
               </TooltipContent>
            </Tooltip>

            {/*=== Italic Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleItalic().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Italic className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Italic <br /> Cmd + I
               </TooltipContent>
            </Tooltip>

            {/*=== Underline Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("underline")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleUnderline().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Underline className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Underline <br /> Cmd + U
               </TooltipContent>
            </Tooltip>

            {/*=== StrikeThrough Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleStrike().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Strikethrough className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Strike <br /> Cmd + Shift + X
               </TooltipContent>
            </Tooltip>

            {/*=== Link Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("link")}
                  onPressedChange={openModal}
               >
                  <TooltipTrigger asChild>
                     <Link className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">Link</TooltipContent>
            </Tooltip>

            {/*=== Unordered List Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBulletList().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <List className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Unordered List
               </TooltipContent>
            </Tooltip>

            {/*=== OrderedList Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleOrderedList().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <ListOrdered className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Ordered List
               </TooltipContent>
            </Tooltip>

            {/*=== Blockquote Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("blockquote")}
                  onPressedChange={() =>
                     editor.chain().focus().toggleBlockquote().run()
                  }
               >
                  <TooltipTrigger asChild>
                     <Quote className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Blockquote
               </TooltipContent>
            </Tooltip>

            {/*=== Code Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("code")}
                  onPressedChange={() => editor.chain().focus().setCode().run()}
               >
                  <TooltipTrigger asChild>
                     <Code className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Code <br /> Cmd + E
               </TooltipContent>
            </Tooltip>

            {/*=== Undo Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("undo")}
                  onPressedChange={() => editor.chain().focus().undo().run()}
               >
                  <TooltipTrigger asChild>
                     <Undo className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Undo <br /> Cmd + Z
               </TooltipContent>
            </Tooltip>

            {/*=== Redo Button ===*/}
            <Tooltip>
               <Toggle
                  size="sm"
                  pressed={editor.isActive("redo")}
                  onPressedChange={() => editor.chain().focus().redo().run()}
               >
                  <TooltipTrigger asChild>
                     <Redo className="size-4" />
                  </TooltipTrigger>
               </Toggle>

               <TooltipContent className="text-center">
                  Redo <br /> Cmd + Y / Shift + Cmd + Z
               </TooltipContent>
            </Tooltip>
         </>
      </div>
   );
};

export default Toolbar;
