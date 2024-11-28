import JsonEditor from "@/components/JsonEditor";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h5 className="mt-5 font-bold">Welcome {user.firstName}!</h5>
      <p className="text-muted-foreground">
        Manage your data and share it with others
      </p>
      <div className="mt-10">
        <JsonEditor />
      </div>
    </div>
  );
};

export default DashboardPage;
