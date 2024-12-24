import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";

interface DialogWrapperProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    title: string;
    description?: string;
}

export default function DialogWrapper({
    trigger,
    content,
    title,
    description
}: DialogWrapperProps){
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                        {content}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}