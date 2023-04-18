/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookmarkToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BookmarkToCategory" DROP CONSTRAINT "_BookmarkToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BookmarkToCategory" DROP CONSTRAINT "_BookmarkToCategory_B_fkey";

-- DropTable
DROP TABLE "public"."Bookmark";

-- DropTable
DROP TABLE "public"."Category";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_BookmarkToCategory";

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookmarks" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "userId" INTEGER,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_bookmarkTocategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_url_key" ON "public"."bookmarks"("url");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_bookmarkTocategory_AB_unique" ON "public"."_bookmarkTocategory"("A", "B");

-- CreateIndex
CREATE INDEX "_bookmarkTocategory_B_index" ON "public"."_bookmarkTocategory"("B");

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_bookmarkTocategory" ADD CONSTRAINT "_bookmarkTocategory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_bookmarkTocategory" ADD CONSTRAINT "_bookmarkTocategory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
