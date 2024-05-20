"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TiptapLinkModalProps } from "@/types";

export const TipTapLinkModal = ({
   url,
   isOpen,
   closeModal,
   onChangeUrl,
   onSaveLink,
   onRemoveLink,
}: TiptapLinkModalProps) => {
   // NOTE: We wont use onSubmit in on the form, because sometimes this component might be used in a form, therefore triggering the main form to submit. Therefore, we would pass the onSubmit to the submit button

   return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit link</DialogTitle>
            </DialogHeader>

            <Input
               placeholder="Enter your link"
               value={url || ""}
               onChange={onChangeUrl}
            />

            <DialogFooter>
               <Button
                  onClick={onRemoveLink}
                  className="bg-destructive text-destructive-foreground"
               >
                  Remove
               </Button>

               <Button onClick={onSaveLink}>Save</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
