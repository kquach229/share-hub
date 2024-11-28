import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="space-y-2 mt-20 flex flex-col align-center justify-center">
      <h1 className="text-3xl font-bold sm:text-5xl">Share Your Quotes</h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl">
        Makes it easy to log and share your worthy quotes with others. Simply
        authenticate and upload your data
      </p>

      <div className="h-[55rem]">
        <div className="p-4 mt-[300px] max-w-2xl mx-auto h-[3rem]">
          <Card className="shadow-md">
            <CardHeader>James Bond</CardHeader>
            <CardContent className="25-[rem]">
              <blockquote className="text-lg text-gray-700 border-l-4 pl-4 italic">
                "Weren't you a blonde when I came in?"
              </blockquote>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-400">
                  Shared on: November 27, 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
