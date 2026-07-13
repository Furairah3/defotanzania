-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "interest" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VolunteerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationIntent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DonationIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleSw" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptSw" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodySw" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleSw" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "fileUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");

-- CreateIndex
CREATE INDEX "NewsPost_published_date_idx" ON "NewsPost"("published", "date");

-- CreateIndex
CREATE INDEX "Publication_published_createdAt_idx" ON "Publication"("published", "createdAt");
