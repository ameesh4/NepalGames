import { AlertDialogTrigger, AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import React from "react";

interface AlertDialogProps {
    title: string;
    content?: () => React.ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    trigger: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
}

export default function AlertDialogElement({
    title,
    content,
    onConfirm,
    onCancel,
    trigger,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
}: AlertDialogProps){
    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {content && <div>{content()}</div>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={()=>onCancel}>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>onConfirm}>{confirmLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}