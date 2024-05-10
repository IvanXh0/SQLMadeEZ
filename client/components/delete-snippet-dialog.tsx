import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";

interface P {
  toggleDialog?: () => void;
  isDialogOpen: boolean;
  deleteSnippet: () => void;
}
export const DeleteSnippetDialog = ({
  isDialogOpen,
  toggleDialog,
  deleteSnippet,
}: P) => (
  <AlertDialog open={isDialogOpen} onOpenChange={toggleDialog}>
    <AlertDialogContent className="md:ml-[8rem]">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          snippet from the database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-700" onClick={deleteSnippet}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
