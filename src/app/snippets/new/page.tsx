import { db } from "@/db";
import { notFound, redirect } from "next/navigation";

export default function SnippetCreatePage() {
    async function createSnippet(formData: FormData) {
        // This needs to be a server action!
        'use server';

        // Check the user's inputs and make sure they're valid
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
        
        // Create a new record in database
        const snippet = await db.snippet.create({
            data: { title, code }
        });
        console.log(snippet);

        // Redirect the user back to the root route
        redirect('/');
    };

    // notFound();
    
    return (
    <form action={createSnippet}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label htmlFor="title" className="w-12">Title</label>
                <input type="text" name="title" id="title" className="border rounded p-2 w-full" />
            </div>

            <div className="flex gap-4">
                <label htmlFor="code" className="w-12">Code</label>
                <textarea name="code" id="code" className="border rounded p-2 w-full" />
            </div>

            <button type="submit" className="rounded p-2 bg-blue-200">Create</button>
        </div>
    </form>
    );
}