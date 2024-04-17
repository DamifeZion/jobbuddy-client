import { setCopied } from "@/services/slices/clipboard-slice/clipboard-slice";
import { useDispatch } from "react-redux";

export const useClipboard = () => {
   const dispatch = useDispatch();

   const copyTextToClipboard = async (text: string) => {
      // We only update the copied if it fails else, it defaults to success
      try {
         if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
         }
         document.execCommand("copy", true, text);
      } catch (err) {
         dispatch(
            setCopied({ success: false, msg: "Failed to copy text: " + err })
         );
      }
   };

   return {
      copyTextToClipboard,
   };
};
